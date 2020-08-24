const { get, isStr } = require('@svkeg/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { buildCmdContext } = require('KegUtils/builders/buildCmdContext')
const { throwPackageError } = require('KegUtils/error/throwPackageError')
const {
  askForPackageVersion,
  buildPackageURL,
  getPackage,
  validatePackageVersion,
} = require('KegUtils/package')

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
  const {
    repo,
    branch,
    context,
    version,
    user=get(globalConfig, 'docker.user'),
    provider=get(globalConfig, 'docker.providerUrl'),
  } = params

  // Get the command context
  const { cmdContext, tap } = await buildCmdContext({
    params,
    globalConfig,
    allowed: get(task, 'options.context.allowed', DOCKER.IMAGES)
  })

  // Get the package that matches the passed in user, context and docker
  const package = await getPackage({
    tap,
    user,
    type: 'docker',
    params: { ...params, context: cmdContext, tap },
  })
  
  // Ensure we have a package to work with
  !package && throwPackageError(`No package found that matches context "${context}"`)

  // If the user passed in a version or branch to use, validate it
  const versionRef = version || branch
  versionRef && validatePackageVersion(versionRef, package)

  // If the user didn't pass in a version, ask the user to select one
  const selectedVersion = versionRef || await askForPackageVersion(package)

  const url = buildPackageURL({
    branch,
    package,
    provider,
    globalConfig,
    version: selectedVersion,
  })

  // Pull the docker image from the built url
  await docker.pull(url)

  // Tag the image with latest if version is master, otherwise tag with the package version.
  Logger.info('Tagging image...')

  selectedVersion === 'master'
    ? await docker.image.tag(url, `${package.image}:latest`)
    : await docker.image.tag(url, `${package.image}:${selectedVersion}`)

  Logger.spacedMsg(`Finished pulling docker package "${ package.image }"`)
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
        example: 'keg docker provider pull --context core',
        enforced: true,
      },
      branch: {
        description: 'Name of branch name that exists as the image name',
        example: 'keg docker provider pull --branch develop',
      },
      provider: {
        description: 'Url of the docker registry provider',
        example: 'keg docker provider pull --provider docker.pkg.github.com',
        default: 'docker.pkg.github.com'
      },
      repo: {
        description: 'The name of the repository holding docker images to pull',
        example: 'keg docker provider pull --repo keg-core',
      },
      tag: {
        description: 'Specify the tag tied to the image being pushed',
        example: 'keg docker provider pull --tag latest',
        default: 'latest',
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: 'keg docker provider pull --tap visitapps',
      },
      token: {
        description: 'API Token for registry provider to allow logging in',
        example: 'keg docker provider pull --token 12345',
      },
      user: {
        description: 'User to use when logging into the registry provider. Defaults to the docker.user property in your global config.',
        example: 'keg docker provider pull --user gituser',
      },
      version: {
        description: 'The version of the image to use. If omitted, the cli will prompt you to select an available version.',
        example: 'keg docker provider pull --version 0.0.1',
      },
    }
  }
}