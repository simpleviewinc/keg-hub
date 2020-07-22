const { copyFile } = require('KegFileSys/fileSys')
const { DOCKER: { CONTAINERS_PATH } } = require('KegConst/docker')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')
const { getRepoPath } = require('KegUtils/getters/getRepoPath')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Builds the docker image for the keg-regulator repo
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const build = async args => {
  // Check the base image and build it if it doesn't exist
  await buildBaseImg(args)

  // Copy the run.sh file from the keg-cli/containers/regulator repo
  const regulatorPath = getRepoPath('regulator')
  await copyFile(`${ CONTAINERS_PATH }/regulator/run.sh`, `${ regulatorPath }/run.sh`)

  // Build the core image through internal task
  return runInternalTask('tasks.docker.tasks.build', {
    ...args,
    params: {
      ...args.params,
      tap: undefined,
      context: 'regulator',
      cache: args.params.cache,
    },
  })

}

module.exports = {
  build: {
    name: 'build',
    action: build,
    description: `Builds the docker image for the keg-regulator repo`,
    example: 'keg regulator build <options>',
    options: {
      args: {
        description: 'Add build args from container env files',
        example: `keg regulator build --args false`,
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: 'keg regulator build cache=false',
        default: true
      },
      local: {
        description: 'Copy the local repo into the docker container at build time',
        example: `keg regulator build --local`,
        default: false,
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg regulator build tags=my-tag,local,development'
      },
      log: {
        description: 'Log docker command',
        example: 'keg regulator build log=true',
        default: false
      },
    }
  }
}