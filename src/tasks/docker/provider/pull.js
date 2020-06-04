const path = require('path')
const docker = require('KegDocCli')
const { get, validate, isStr } = require('jsutils')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { ask, input } = require('KegQuestions')
const { PACKAGE_TYPES } = require('KegConst/packages')
const { throwRequired } = require('KegUtils/error')
const { getAllPackages } = require('KegUtils/docker')

/**
 * Builds the url used to pull the docker image from the provider/registry
 * @param {Object} options 
 * @param {string} options.account 
 * @param {string} options.provider - registry url, defaults to github docker packages
 * @param {string} options.repo - (required) name of repo
 * @param {string} options.image - (required) name of container/image to pull (e.g kegbase)
 * @param {string} options.version - used if defined, otherwise uses branch
 * @param {string} options.branch - name of branch. used only if version is undefined. 
 */
const buildPackageURL = (options={}) => {
  // TODO: Validate the arguments of the url
  const {
    account='simpleviewinc', 
    provider, 
    repo, 
    image,
    version,
    branch='master',
  } = options

  validate(options, {
    $default: isStr, 
    version: v => isStr(v) || v === undefined,
    branch: b => isStr(b) || b === undefined,
  })

  // create a url like: docker.pkg.github.com/lancetipton/keg-core/kegbase:1.3.2
  return path.join(provider, account, repo, image) + `:${version || branch}`
}


/**
 * @param {Array<Object>} packages - all packages to choose from
 * @param {String} context - the docker image context
 */
const getPackage = (packages, context) => {
  const targetImageName = `keg${context}`

  const package = packages.find(p => {
    const [_, imageName] = p.nameWithOwner.split('/') 
    return imageName === targetImageName
  })

  const [ owner, image ] = package.nameWithOwner.split('/')

  const versions = package.versions.nodes

  return {
    image,
    owner,
    versions,
    nameWithOwner: package.nameWithOwner,
  }
}

/**
 * Asks the user which version of the package to use
 * @param {*} package 
 */
const getVersion = async (package) => {
  if (!package || !package.versions || !package.versions.length) {
    Logger.print(Logger.color('red', 'No versions are submitted for that package. Exiting...'))
    process.exit(1)
  }

  Logger.print(Logger.color('green', 'Image Versions:'))
  package.versions.map(
    (v, idx) => Logger.print(`  ${idx} => ${v.version}`)
  )

  let selection = null 
  while (!selection || isNaN(selection)) {
    selection = await ask.input(Logger.color('yellow', `Select a version:`))
  }

  return package
    .versions[selection]
    .version
}

/**
 * @param {string} version - version to validate
 * @param {Object} package - the github package containing available versions
 * 
 * @return {boolean} true if the version is an available version for the package
 */
const validateVersion = (version, package) => {
  const valid = version && package.versions.some(v => v.version === version)
  if (!valid) {
    Logger.error(`Version "${version}" is not a valid version for this package. Try running this task without the --version flag to see available versions.`)
    process.exit(1)
  }
}


/**
 * Pulls an image locally from a configured registry provider in the cloud
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - Current task being run
 * @param {Object} args.params - Formatted key / value pair of the passed in options
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const providerPull = async args => {
  const { globalConfig, params, task } = args
  const { context, branch, user, version } = params

  // Ensure we have the context of the image to be pushed
  !context && throwRequired(task, 'context', get(task, `options.context`))

  // TODO: get cmdContext
  // Hardcoded for now
  const repo = 'keg-core'

  const packages = await getAllPackages({ 
    params, 
    user,
    packageType: PACKAGE_TYPES.DOCKER,
    __TEST__: true, 
  })

  const package = getPackage(packages, context)
  version && validateVersion(version, package)

  const provider = get(globalConfig, 'docker.providerUrl')
  const selectedVersion = !version && await getVersion(package)

  // const url = path.join(providerUrl, package.owner, repoName, package.image) + `:${version || branch}`
  const url = buildPackageURL({
    account: package.owner,
    provider,
    repo,
    image: package.image,
    version: version || selectedVersion,
    branch
  })

  return console.log(url)

  await docker.pull(url)

  // TODO: Pull the "version" from the package returned from the "getAllPackages" call
  // Then use that to tag the image. This should only be done for non-master branches
  // So the tag will look like kegbase:my-feature-brance 

  // Tag the image with local tag so we can use it with the local context names I.E. base | core | tap
  // version should be a branch name or the actual version when branch is master 
  await docker.image.tag(url, `${package.image}:${selectedVersion}`)

  // TODO: add check if the image is from the master branch. If it is, then add the latest tag
  // await docker.image.tag(url, `${imgName}:latest`)

  Logger.empty()

}

module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: providerPull,
    description: 'Pulls an image from a Docker registry provider',
    example: 'keg docker provider pull <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
      branch: {
        description: 'Name of branch name that exists as the image name',
      },
      provider: {
        description: 'Url of the docker registry provider',
        example: 'keg docker provider login --provider docker.pkg.github.com',
        default: 'docker.pkg.github.com'
      },
      tag: {
        description: 'Specify the tag tied to the image being pushed',
        default: 'latest',
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
      },
      token: {
        description: 'API Token for registry provider to allow logging in',
        example: 'keg docker provider login --token 12345',
        enforced: true
      },
      user: {
        description: 'User to use when logging into the registry provider',
        example: 'keg docker provider login --user foobar',
        enforced: true
      },
      version: {
        description: 'The version of the image to use. If omitted, the cli will prompt you to select an available version.',
        example: 'keg docker provider pull --context base --version 0.0.1',
      }
    }
  }
}