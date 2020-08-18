const envCommand = args => {
  const { command, options, tasks, globalConfig } = args

  console.log(`---------- cli command ----------`)
  // TODO: Print cli information here from package JSON

}

module.exports = {
  env: {
    name: 'env',
    alias: [],
    action: envCommand,
    description: 'Keg CLI env tasks',
    example: 'keg cli env <command> <options>',
    tasks: {
      ...require('./set'),
      ...require('./sync'),
      ...require('./unset'),
    },
  }
}
