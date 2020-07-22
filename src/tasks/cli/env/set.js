const setEnv = args => {
  const { command, options, tasks, globalConfig } = args


}

module.exports = {
  set: {
    name: 'set',
    alias: [],
    action: setEnv,
    description: 'Set env values for the Global Keg-CLI env file',
    example: 'keg cli env set <key> <value> <options>',
    options: {
      shorthand: {
        description: 'Allows setting the environment variable by shorthand',
        example: 'keg cli env set MY_ENV=my_value',
        enforce: true,
      },
      key: {
        description: 'Key of the environment variable. Will be converted to all capital letters',
        example: 'keg cli env set key=MY_ENV',
        enforce: true,
      },
      value: {
        alias: [ 'val' ],
        description: 'Value of the environment variable',
        example: 'keg cli env set value=my_value',
        enforce: true,
      },
      force: {
        description: "Force saves the environment variable, overriding existing values.",
        example: 'keg cli env set key=MY_VALUE value=my_value --force',
        default: false
      }
    },
  }
}
