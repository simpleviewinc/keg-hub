const { get } = require('jsutils')

const generateTask = (args) => {

  
  const { command, options, globalConfig } = args
  
  console.log(`---------- globalConfig ----------`)
  // console.log(globalConfig)
  console.log(get(globalConfig, 'keg.cli.paths'))

}


module.exports = {
  name: 'task',
  alias: [ 'tk' ],
  action: generateTask,
  description: `Generates scaffolding for a new CLI Task!`,
  example: 'keg generate task <options>',
}