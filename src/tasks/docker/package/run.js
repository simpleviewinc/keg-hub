const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { isUrl, get, deepMerge } = require('jsutils')
const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { parsePackageUrl } = require('KegUtils/package/parsePackageUrl')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { PACKAGE } = CONTAINER_PREFIXES

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
  const { context, cleanup, package, provider, repo, user, version } = params

  // TODO: Add check, if a context is provided, and no package
  // Then use the package utils to get a list of all packages for that context
  // Allow the user to select a package from the list
  // Or if a package is provided, build the packageUrl url

  /*
  * ----------- Step 1 ----------- *
  * Get the full package url
  */
  const packageUrl = isUrl(package)
    ? package
    : isUrl(provider)
      ? `${provider}/${package}`
      : `${ get(globalConfig, `docker.providerUrl`) }/${ package }`

  const parsed = parsePackageUrl(packageUrl)

  /*
  * ----------- Step 2 ----------- *
  * Pull the image from the provider and tag it
  */
  await docker.pull(packageUrl)
  await docker.image.tag(packageUrl, `${parsed.image}:${parsed.tag}`)

  /*
  * ----------- Step 3 ----------- *
  * Build the container context information
  */
  const { cmdContext, contextEnvs, location } = await buildContainerContext({
    globalConfig,
    params: { ...params, context: parsed.repo },
    // Need to add our packaged repo to the allow options so we can run it
    task: deepMerge(task, { options: { context: { allowed: [ parsed.repo ] } } }),
  })

  /*
  * ----------- Step 4 ----------- *
  * Run the image in a container without mounting any volumes
  */
  const opts = [ `-it` ]
  cleanup && opts.push(`--rm`)
  await docker.image.run({
    ...parsed,
    opts,
    location,
    envs: contextEnvs,
    cmd: `/bin/sh ${ contextEnvs.DOC_CLI_PATH }/containers/${ cmdContext }/run.sh`,
    name: `${ PACKAGE }-${ parsed.image }-${ parsed.tag }`,
  })

}

module.exports = {
  run: {
    name: 'run',
    action: dockerPackageRun,
    description: `Runs a git pr docker image in a container`,
    example: 'keg docker package run <options>',
    options: {
      package: {
        description: 'Pull request package url or name',
        example: `keg docker package --package lancetipton/keg-core/kegcore:bug-fixes`,
        required: true,
        ask: {
          message: 'Enter the docker package url or path (<user>/<repo>/<package>:<tag>)',
        }
      },
      branch: {
        description: 'Name of branch name that exists as the image name',
        example: 'keg docker package run --branch develop',
      },
      context: {
        alias: [ 'name' ],
        allowed: [],
        description: 'Context of the docker package to run',
        example: 'keg docker package run --context core',
        enforced: true,
      },
      cleanup: {
        alias: [ 'clean', 'rm' ],
        description: 'Auto remove the docker container after exiting',
        example: `keg docker package run --cleanup false`,
        default: true
      },
      provider: {
        alias: [ 'pro' ],
        description: 'Url of the docker registry provider',
        example: 'keg docker package run --provider docker.pkg.github.com'
      },
      repo: {
        description: 'The name of the repository holding docker images to pull',
        example: 'keg docker package run --repo keg-core',
      },
      user: {
        alias: [ 'usr' ],
        description: 'User to use when logging into the registry provider. Defaults to the docker.user property in your global config.',
        example: 'keg docker package run --user gituser',
      },
      version: {
        description: 'The version of the image to use. If omitted, the cli will prompt you to select an available version.',
        example: 'keg docker package run --version 0.0.1',
      },
    }
  }
}
