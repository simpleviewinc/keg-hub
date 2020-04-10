/*
  * What buildCore method should do
    1. Build a docker container for keg-core
*/

const buildDocker = () => {
// To run the keg without a tap
/*
  docker run --rm -it \
  -v $PWD/:/keg/keg-core \
  -v $PWD/package.json:/keg/keg-core/package.json \
  -p 10000:10000 \
  keg-core:local /bin/bash
*/

}

/**
 * Build the keg-core in docker, without a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildCore = args => {
  const { command, options, tasks, globalConfig } = args
  `docker build -f ./dev/Dockerfile . -t keg-core:local`
}

module.exports = {
  name: 'build',
  alias: [ 'bld', 'make' ],
  action: buildCore,
  description: `Builds the keg-core docker container`,
  example: 'keg core build <options>'
}