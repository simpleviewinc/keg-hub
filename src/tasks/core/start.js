/*
  * What startCore method should do
    1. Start a docker container for the tap
    2. Mount the tap into the docker container at a consistent location
      * Should get hosts tap location from global config
    3. Mount keg-core into node_modules of tap
      * tap/node_modules/keg-core
      * Should get hosts keg-core location from global config
    4. Mount re-theme / tap-resolver into keg-core node_modules
      * tap/node_modules/keg-core/node_modules/*
      * Should get hosts re-theme / tap-resolver location from global config
    5. Start the expo server type based on params
      * Native || Web
    6. Expose the ports to allow host machine to access the server in the container
*/

const startDocker = () => {
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
 * Start the keg-core in a docker container, without a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startCore = (args) => {
  console.log(`--- startCore a cli command ---`)
}

module.exports = {
  name: 'start',
  alias: [ 'st', 'run' ],
  action: startCore,
  description: `Runs keg-core in a docker container`,
  example: 'keg core start <options>'
}