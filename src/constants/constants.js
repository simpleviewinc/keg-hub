const { deepFreeze, keyMap } = require('jsutils')
const homeDir = require('os').homedir()
const path = require('path')
const { KEG_GLOBAL_CONFIG } = process.env

// The default global config path
const CLI_CONFIG = 'cli.config'
let GLOBAL_CONFIG_FOLDER = path.join(homeDir, '.kegConfig')
let GLOBAL_CONFIG_FILE = CLI_CONFIG

// If the global config path is passed in as an ENV, use that instead
if(KEG_GLOBAL_CONFIG){
  const configPathSplit = KEG_GLOBAL_CONFIG.split('/')
  GLOBAL_CONFIG_FILE = configPathSplit.pop()
  GLOBAL_CONFIG_FOLDER = configPathSplit.join('/')
}

module.exports = deepFreeze({

  // Tasks settings
  TASK_REQURIED: [
    'prefix',
    'name',
    'action',
    'description'
  ],

  // Global config settings
  GLOBAL_CONFIG_PATHS: {
    CLI: 'cli',
    CLI_PATHS: 'cli.paths',
    GIT: 'cli.git',
    TAPS: `cli.taps`,
    TAP_LINKS: `cli.taps.links`,
  },

  // Sets the command to open an IDE
  GLOBAL_CONFIG_EDITOR_CMD: 'cli.settings.editorCmd',
  GLOBAL_CONFIG_FOLDER: GLOBAL_CONFIG_FOLDER,
  GLOBAL_CONFIG_FILE: GLOBAL_CONFIG_FILE,

  CLI_CONFIG: `${ CLI_CONFIG }.json`,
  DEFAULT_ENV: `defaults.env`,
  
  // Check if the command should be logged
  // Passed as the last argument to the spawnCmd method
  NO_CMD_LOG: `NO_CMD_LOG`,
  
  // Help options. when one is passed as an option, the help menu is printed
  HELP_ARGS: [
    'help',
    '-help',
    '--help',
    'h',
    '-h',
    '--h',
  ],

  // Option values that will be converted into booleans
  BOOL_VALUES: {
    truthy: [
      'true',
      't',
      'yes',
      'y',
    ],
    falsy: [
      'false',
      'f',
      'no',
      'n'
    ]
  },

  CLI_ROOT: path.join(__dirname, '../../'),

  // --- GIT Constants --- //
  // Path the the git ssh key
  GIT_SSH_KEY_PATH: path.join(homeDir, '.ssh/github'),
  GIT_SSH_COMMAND: "ssh",
  GIT_SSH_KEY: '-i {{ GIT_KEY_PATH }}',
  GIT_SSH_PARAMS: [
    '-o BatchMode=yes',
    '-o UserKnownHostsFile=/dev/null',
    '-o StrictHostKeyChecking=no'
  ],

  // Shortcuts to map env to real environment
  ENV_MAP: {
    PRODUCTION: [ 'production', 'prod', 'p' ],
    QA: [ 'qa', 'q' ],
    STAGING: [ 'staging', 'st', 's' ],
    DEVELOPMENT: [ 'development', 'dev', 'd' ],
    LOCAL: [ 'local', 'loc', 'l' ]
  },

  // Keys in the object that should be returned by
  // the buildContainerContext method
  CONTEXT_KEYS: [
    `cmdContext`,
    'contextEnvs',
    `image`,
    'location',
    'tap'
  ],

  // URLs for navigating to the application
  TAP_URL: `http://tap.kegdev.xyz/`,
  // ENV port to map to port 80 inside the docker container
  HTTP_PORT_ENV: `DOC_APP_PORT`,
  

  // Container context helpers
  // Mapped prefixes for some tasks that add prefixes when running containers
  CONTAINER_PREFIXES: {
    PACKAGE: 'package',
    IMAGE: 'img',
  },

  // Map shortcuts and variations between the container cmdContext and the container
  CONTAINER_ALIAS: {

    base: 'keg-base',
    // -- Reverse -- //
    kegbase: 'base',
    'keg-base': 'base',

    core: 'keg-core',
    // -- Reverse -- //
    kegcore: 'core',
    'keg-core': 'core',

    comp: 'keg-components',
    components: 'keg-components',
    // -- Reverse -- //
    kegcomp: 'components',
    kegcomponents: 'components',
    'keg-comp': 'components',
    'keg-components': 'components',
    
    regulator: 'keg-regulator',
    reg: 'keg-regulator',
    // -- Reverse -- //
    kegregulator: 'regulator',
    'kegreg': 'regulator',
    'keg-regulator': 'regulator',
    'keg-reg': 'regulator',

  },

})