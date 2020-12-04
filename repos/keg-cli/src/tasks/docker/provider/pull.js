const { get, isStr } = require('@keg-hub/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { buildCmdContext } = require('KegUtils/builders/buildCmdContext')
const { throwPackageError } = require('KegUtils/error/throwPackageError')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')
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
    options: mergeTaskOptions(`docker provider`, `pull`, `pull`),
  }
}