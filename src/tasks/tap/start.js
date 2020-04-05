/*
  * What startTap method should do
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

const startTap = (args) => {
  console.log(`--- startTap a cli command ---`)
}

module.exports = {
  name: 'start',
  alias: [ 'st', 'run' ],
  action: startTap,
  description: `Runs a tap in a docker container`,
  example: 'keg tap start <options>'
}