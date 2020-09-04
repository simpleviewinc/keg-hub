const fs = require('fs')
const { deepMerge } = require('@keg-hub/jsutils')

/**
 * Reads the passed in filePath or content, and replaces content with values from the global config 
 * @function
 * @param {string} filePath - Path to the file to parse
 * @param {string} [encoding='utf8'] - File encoding of the .env file
 *
 * @returns {string} - Passed in template or content from filePath with values replaced
 */
const parseTemplate = ({ filePath, template, encoding='utf8', data={} }) => {
  const { getGlobalConfig } = require('KegUtils/globalConfig/getGlobalConfig')
  const { fillTemplate } = require('KegUtils/template/fillTemplate')
  const globalConfig = getGlobalConfig() || {}

  // Add the globalConfig, and the process.envs as the data objects
  // This allows values in ENV templates from globalConfig || process.env
  // In the template example: 
  //    RN_PACKAGER_IP={{ envs.KEG_DOCKER_IP }}
  const fillData = {
    ...deepMerge(globalConfig, data),
    envs: deepMerge(
      globalConfig.envs,
      process.env,
      data.envs,
      data.ENVS
    )
  }

  return fillTemplate({
    template: template || fs.readFileSync(filePath, { encoding }),
    data: fillData
  })
}

  
  
module.exports = {
  parseTemplate
}
