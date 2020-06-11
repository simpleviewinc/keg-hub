require('module-alias/register')

const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { ask } = require('KegQuestions')
const { deepMerge } = require('jsutils')
const { DOCKER } = require('KegConst/docker')
const cliJson = require('KegRoot/scripts/setup/cli.config.json')

/**
 * Asks the user a few questions to help build out the global config
 *
 * @returns {Object} - Default global config based off user answers
 */
const configSetup = async () => {
  const gc = {}
  Logger.header(`Keg Cli config setup...`)
  


  return gc
}


// TODO: Add check to auto-run when running form terminal || export method
module.exports = {
  configSetup
}