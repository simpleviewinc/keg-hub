const { deepFreeze } = require('jsutils')
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
    TAPS: `keg.cli.taps`,
    TAP_LINKS: `keg.cli.taps.links`,
  },

  SSH_KEY_PATH: path.join(homeDir, '.ssh/github'),

  GLOBAL_CONFIG_FOLDER: GLOBAL_CONFIG_FOLDER,
  GLOBAL_CONFIG_FILE: GLOBAL_CONFIG_FILE,
  HELP_ARGS: [
    'help',
    '-help',
    '--help',
    'h',
    '-h',
    '--h',
  ]
})