const { deepFreeze, keyMap } = require('@keg-hub/jsutils')
const homeDir = require('os').homedir()
const path = require('path')
const { KEG_GLOBAL_CONFIG } = process.env

// Cache the root of the CLI for easy access
const CLI_ROOT = path.join(__dirname, '../../')

// The default global config path and config file
let GLOBAL_CONFIG_FOLDER = path.join(homeDir, '.kegConfig')
let GLOBAL_CONFIG_FILE = 'cli.config.json'

// If the global config path is passed in as an ENV, use that instead
if(KEG_GLOBAL_CONFIG){
  const configPathSplit = KEG_GLOBAL_CONFIG.split('/')
  GLOBAL_CONFIG_FILE = configPathSplit.pop()
  GLOBAL_CONFIG_FOLDER = configPathSplit.join('/')
}

let GLOBAL_INJECT_FOLDER = path.join(GLOBAL_CONFIG_FOLDER, '.tmp')

module.exports = deepFreeze({

  // Tasks settings
  TASK_REQUIRED: [
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

  CLI_ROOT,
  GLOBAL_CONFIG_FILE,
  GLOBAL_INJECT_FOLDER,
  GLOBAL_CONFIG_FOLDER,

  // Sets the command to open an IDE
  GLOBAL_CONFIG_EDITOR_CMD: 'cli.settings.editorCmd',


  // Keg Default .env file
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
  ENV_OPTIONS: [ 'environment', 'env', 'e' ],

  // Environment keys mapped to their shortcuts 
  ENV_MAP: {
    PRODUCTION: [ 'production', 'prod', 'p' ],
    CI: [ 'ci', 'c' ],
    QA: [ 'qa', 'q' ],
    STAGING: [ 'staging', 'st', 's' ],
    DEVELOPMENT: [ 'development', 'dev', 'd' ],
    LOCAL: [ 'local', 'loc', 'l' ],
    TEST: [ 'test', 'tst', 't' ]
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

  SYNC_PREFIXES: {
    BDD_SERVICE: 'bdd',
  },

  // Container context helpers
  // Mapped prefixes for some tasks that add prefixes when running containers
  CONTAINER_PREFIXES: {
    PACKAGE: 'package',
    IMAGE: 'img',
  },

  CONTEXT_TO_CONTAINER: {
    base: 'keg-base',
    comp: 'keg-components',
    components: 'keg-components',
    core: 'keg-core',
    proxy: 'keg-proxy',
  },

  // Map shortcuts and variations between the container cmdContext and the container
  CONTAINER_TO_CONTEXT: {
    kegbase: 'base',
    'keg-base': 'base',
    kegcomp: 'components',
    kegcomponents: 'components',
    'keg-comp': 'components',
    'keg-components': 'components',
    kegcore: 'core',
    'keg-core': 'core',
    kegproxy: 'proxy',
    'keg-proxy': 'proxy',
  },

  // docker exec constants and options for the utils/services/composeService.js
  KEG_DOCKER_EXEC: 'KEG_DOCKER_EXEC',
  KEG_EXEC_OPTS: {
    start: 'compose-start',
    packageRun: 'package-run',
    dockerExec: 'docker-exec',
  },

  VERSION: {
    TYPES: [
      'major',
      'minor',
      'patch',
    ]
  }

})
