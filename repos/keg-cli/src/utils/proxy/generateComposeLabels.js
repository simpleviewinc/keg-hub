const { KEG_ENVS } = require('KegConst/envs')
const { kegLabels, proxyLabels } = require('KegConst/docker/labels')
const { get, eitherArr } = require('@keg-hub/jsutils')
const { fillTemplate } = require('KegUtils/template')

/**
 * Build the host url label used by keg-proxy
 * @param {Object} data - Data to generate the labels from
 * @param {Array} labelData - Constant label data defined in keg-cli/constants/docker/labels
 * @param {string} composeService - The docker-compose service the label will be added to
 * 
 * @returns {string} - Built host url label for the proxy
 */
const buildProxyHost = (data, labelData) => {
  const [ key, valuePath, label ] = labelData

  const proxyHost = get(data, `contextEnvs.${key}`, get(data, valuePath, KEG_ENVS.KEG_PROXY_HOST))
  const subDomain = get(data, 'proxyDomain', get(data, 'image'))

  return fillTemplate({ template: label, data: { ...data, [key]: `${subDomain}.${proxyHost}` }})

}

/**
 * Gets the value for the label
 * @param {Object} data - Data to generate the labels from
 * @param {Array} labelData - Constant label data defined in keg-cli/constants/docker/labels
 * 
 * @returns {string} - Found label value
 */
const getLabelItem = (data, labelData) => {
  const [ key, valuePath, label ] = labelData

  const lookupPaths = eitherArr(valuePath, [ valuePath ])
  const value = lookupPaths.reduce((found, lookup) => found || get(data, lookup), '')

  return value
    ? fillTemplate({ template: label, data: { ...data, [key]: value }})
    : label
}

/**
 * Generates a docker-compose label from the passed in arguments
 * @param {string} generated - Already generated labels
 * @param {Object} data - Data to generate the labels from
 * @param {Array} labelData - Constant label data defined in keg-cli/constants/docker/labels
 *
 * @returns {string} - Updated generated labels with new labels added to it
 */
const buildLabels = (generated, data, labelData) => {

  const item = labelData[0] == 'KEG_PROXY_HOST'
    ? buildProxyHost(data, labelData)
    : getLabelItem(data, labelData)

  return item ? `${generated}      - ${item}\n` : generated
}

/**
 * Loops over the pre-defined docker-compose label constants, and adds their value
 * @param {string} generated - Already generated labels
 * @param {Object} data - Data to generate the labels from
 *
 * @returns {string} - Updated generated labels with new labels added to it
 */
const generateComposeLabels = data => {

  const genLabels = proxyLabels.reduce((labels, item) => {
    return buildLabels(labels, data, item)
  }, '')

  return kegLabels.reduce((labels, item) => {
    return buildLabels(labels, data, item)
  }, genLabels)
}


module.exports = {
  generateComposeLabels
}