const { deepFreeze, keyMap } = require('jsutils')
const homeDir = require('os').homedir()
const path = require('path')

const { GLOBAL_CONFIG_PATH } = process.env

// The default global config path
let GLOBAL_CONFIG_FOLDER = path.join(homeDir, '.kegConfig')
let GLOBAL_CONFIG_FILE = 'cli.config'

// If the global config path is passed in as an ENV, use that instead
if(GLOBAL_CONFIG_PATH){
  const configPathSplit = GLOBAL_CONFIG_PATH.split('/')
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

  CLI_ROOT: path.join(__dirname, '../../../'),

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

})