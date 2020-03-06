const generateTask = (args) => {

  console.log(`---------- generate task ----------`)
  const { command, options, globalConfig } = args

}


module.exports = {
  name: 'task',
  alias: [ 'tk' ],
  action: generateTask,
  description: `Generates scaffolding for a new CLI Task!`,
  example: 'keg generate task <options>',
}