const cliCommand = args => {
  const { command, options, tasks, globalConfig } = args

  console.log(`---------- cli command ----------`)
  // TODO: Print cli information here from package JSON

}

module.exports = {
  cli: {
    name: 'cli',
    alias: [],
    action: cliCommand,
    description: 'Keg CLI specific tasks',
    example: 'keg cli <command> <options>',
    tasks: {
      ...require('./env'),
      ...require('./print'),
      ...require('./update'),
    },
  }
}
