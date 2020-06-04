const { get, validate, isStr } = require('jsutils')
const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { promptList } = require('KegQuestions')
const { PACKAGE_TYPES } = require('KegConst/packages')
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
    version: v => !v || isStr(v),
    branch: b => !b || isStr(b),
  })

  // create a url like: docker.pkg.github.com/lancetipton/keg-core/kegbase:1.3.2
  return path.join(provider, account, repo, image) + `:${version || branch}`
}

/**
 * Gets the package that matches the context for hte image name
 * @param {Array<Object>} packages - all packages to choose from
 * @param {String} context - the docker image context
 * @return {Object} package - an object with keys: image, owner, repo, versions, nameWithOwner
 */
const getPackage = (packages, context) => {
  const targetImageName = `keg${context}`

  return packages.find(p => {
    const [_, imageName] = p.nameWithOwner.split('/') 
    return imageName === targetImageName
  })
}

/**
 * @param {Object} package - github package object as returned by the graphql github api
 * @return {Object} package - an object with keys: image, owner, repo, versions, nameWithOwner
 *  - image {String}: the name of the docker image 
 *  - owner {String}: the owner/account of the package
 *  - repo {String}: the name of the repo the package was submitted to
 *  - versions {Array}: array of available versions. Each item is an object with { id, version } props
 */
const formatPackage = package => {
  const [ owner, image ] = package.nameWithOwner.split('/')
  const versions = package.versions.nodes
  const repo = package.repository.name
  const packagePath = path.join(owner, repo, image)

  return {
    image,
    owner,
    repo,
    versions,
    path: packagePath,
    nameWithOwner: package.nameWithOwner,
  }
}

/**
 * Prompts user to select a package
 * @param {Array} packages - array of packages to select from
 * @param {String} user - name of user
 * @returns {Object} the selected package
 */
const askForPackage = async (packages, user) => {
  // validate the input
  if (!packages || !packages.length) {
    Logger.error(`No packages found for user "${user}". Exiting...`)
    process.exit(1)
  }

  const paths = packages.map(p => p.path)
  const index = await promptList(paths, 'Available Packages:', 'Select a package:')
  return packages[index]
}

/**
 * Asks the user which version of the package to use
 * @param {Object} package - the package object returned by getPackage or askForPackage
 */
const askForVersion = async (package) => {
  // validate the input
  if (!package || !package.versions || !package.versions.length) {
    Logger.error('No versions have been submitted for this package. Exiting...')
    process.exit(1)
  }

  const versions = package.versions.map(v => v.version)

  const selectedIndex = await promptList(versions, 'Image Versions:', 'Select a version')

  return package
      .versions[selectedIndex]
      .version
}

/**
 * @param {string} version - version to validate - can be either a branch or a semver string
 * @param {Object} package - the github package containing available versions
 * @return {boolean} true if the version is an available version for the package
 */
const validateVersion = (version, package) => {
  const valid = version && package.versions.some(v => v.version === version)
  if (!valid) {
    const availableVersions = package.versions.map(v => v.version).join(", ")
    Logger.error(
      `Version "${version}" is not a valid version for this package. Available versions: [ ${availableVersions} ]`
    )
    process.exit(1)
  }
  return version
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
  const { globalConfig, params } = args
  const { 
    context, 
    branch, 
    user=get(globalConfig, 'docker.user'), 
    version, 
    repo 
  } = params

  // get all the docker packages available for the context / user
  const rawPackages = await getAllPackages({ params, user, packageType: PACKAGE_TYPES.DOCKER })

  // format the packages then get all the packages for the repo, if --repo was passed in
  const packages = rawPackages
    .map(formatPackage)
    .filter(package => !repo || package.repo === repo)

  // get the package that matches the context
  const package = context 
    ? getPackage(packages, context)
    : await askForPackage(packages, user)
  
  if (!package) return Logger.error(`No package found that matches context "${context}"`)

  const provider = get(globalConfig, 'docker.providerUrl');

  // if the user passed in a version or branch to use, validate it
  const imageVersionOption = version || branch
  imageVersionOption && validateVersion(imageVersionOption, package)

  // if the user didn't pass in a version, ask the user to select one
  const selectedVersion = imageVersionOption || await askForVersion(package)

  const url = buildPackageURL({
    account: package.owner,
    provider,
    repo: package.repo,
    image: package.image,
    version: selectedVersion,
    branch
  })

  await docker.pull(url)

  // tag the image with latest if version is master branch. Otherwise tag with the package version.
  Logger.info('Tagging image...')
  version === 'master'
    ? await docker.image.tag(url, `${package.image}:latest`)
    : await docker.image.tag(url, `${package.image}:${selectedVersion}`)
  Logger.info('Done.')
}

module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: providerPull,
    description: 'Pulls an image from a Docker registry provider',
    example: 'keg docker provider pull --user lancetipton',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
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
      },
      user: {
        description: 'User to use when logging into the registry provider. Defaults to the docker.user property in your global config.',
        example: 'keg docker provider login --user foobar',
      },
      version: {
        description: 'The version of the image to use. If omitted, the cli will prompt you to select an available version.',
        example: 'keg docker provider pull --context base --version 0.0.1',
      },
      repo: {
        description: 'The name of the repository holding docker images to pull',
        example: 'keg docker provider pull --user lancetipton --repo keg-core',
      }
    }
  }
}