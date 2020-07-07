const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { DOCKER: { CONTAINERS_PATH } } = require('KegConst/docker')
const { getRepoPath } = require('KegUtils/getters/getRepoPath')
const { copyFile } = require('KegFileSys/fileSys')

const copyRunScript = () => {
  const regulatorPath = getRepoPath('regulator')
  return copyFile(
    `${ CONTAINERS_PATH }/regulator/run.sh`,
    `${ regulatorPath }/run.sh`
  )

}

/**
 * Restart the keg-regulator container with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const restart = async args => {
  const { params: { log, script } } = args

  // Copy the run script in-case there were updates
  script && await copyRunScript()

  // Run the docker-compose restart task
  await runInternalTask('docker.tasks.compose.tasks.restart', {
    ...args,
    params: { ...args.params, context: 'regulator' },
  })

  // Run the docker log task
  return log && runInternalTask('docker.tasks.log', {
    ...args,
    params: {
      ...args.params,
      context: 'regulator',
    },
  })

}

module.exports = {
  restart: {
    name: `restart`,
    alias: [ 'rest', 'rerun', 'rr', 'rst' ],
    action: restart,
    description: `Restart the keg-regulator container with docker-compose`,
    example: 'keg regulator restart <options>',
    options: {
      log: {
        description: "Auto-log the container output on restart",
        example: 'keg regulator restart --log false',
        default: true
      },
      script: {
        alias: [ 'copy' ],
        description: "Copy the run.sh script from the container/regulator folder",
        example: 'keg regulator restart --script false',
        default: true
      }
    }
  }
}