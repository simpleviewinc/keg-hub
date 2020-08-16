
module.exports = {

  // Option values that will be converted into booleans
  bools: {
    truthy: [
      true,
      'true',
      't',
      'yes',
      'y',
    ],
    falsy: [
      false,
      'false',
      'f',
      'no',
      'n'
    ]
  },
  // Default environment argument to allow short cuts when setting an env
  environment: {
    options: [ 'environment', 'env', 'e' ],
    map: {
      production: [ 'production', 'prod', 'p' ],
      qa: [ 'qa', 'q' ],
      staging: [ 'staging', 'st', 's' ],
      development: [ 'development', 'dev', 'd' ],
      local: [ 'local', 'loc', 'l' ],
      test: [ 'test', 'tst', 't' ]
    },
  },

  // Global default task options that get added to every task
  defaultArgs: {
    env: {
      alias: [ 'environment' ],
      description: 'Environment to run the task in',
      example: '<command> --env staging',
      default: 'development',
    },
  },
  
  // Task parsing settings
  settings: {
    defaultEnv: 'development',
    task: {
      optionsAsk: true
    }
  }

}
