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