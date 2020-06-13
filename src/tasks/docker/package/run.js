const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { isUrl, get } = require('jsutils')
const { DOCKER } = require('KegConst/docker')
const { buildDockerCmd } = require('KegUtils/docker')
const { copyFileSync } = require('KegFileSys/fileSys')
const { buildLocationContext } = require('KegUtils/builders')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig/getPathFromConfig')

/**
 * Builds a docker container so it can be run
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Object} - Build image as a json object
 */
const dockerPackageRun = async args => {
  const { globalConfig, options, params, task, tasks } = args
  const { package, provider } = params

  // TODO: Add check, if a context is provided, and no package
  // Then use the package utils to get a list of all packages for that context
  // Allow the user to select a package from the list

  // Or if a package is provided, build the fullPackage url

  // Get the full package url
  const fullPackage = isUrl(package)
    ? package
    : isUrl(provider)
      ? `${provider}/${package}`
      : `${ get(globalConfig, `docker.providerUrl`) }/${ package }`

  console.log(`---------- fullPackage ----------`)
  console.log(fullPackage)
  // TODO: Pull the image using the fullPackage url
  // Then run the it in a container without mounting any volumes

}

module.exports = {
  run: {
    name: 'run',
    action: dockerPackageRun,
    description: `Runs a git pr docker image in a container`,
    example: 'keg docker package run <options>',
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker package to run',
        example: 'keg docker package run --context core',
        enforced: true,
      },
      package: {
        description: 'Pull request package url or name',
        example: `keg docker ps --package lancetipton/keg-core/kegcore:bug-fixes`,
        required: true,
        ask: {
          message: 'Enter the docker package url or path (<user>/<repo>/<package>:<tag>)',
        }
      },
      provider: {
        alias: [ 'pro' ],
        description: 'Url of the docker registry provider',
        example: 'keg docker provider pull --provider docker.pkg.github.com'
      },
    }
  }
}
