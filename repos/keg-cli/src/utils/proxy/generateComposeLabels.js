const { kegLabels, proxyLabels } = require('KegConst/docker/labels')
const { get, eitherArr } = require('@keg-hub/jsutils')
const { fillTemplate } = require('KegUtils/template')
const { getProxyHost } = require('./getProxyHost')
const { buildLabel } = require('KegUtils/helpers/buildLabel')

/**
 * Build the host url label used by keg-proxy
 * @param {Object} data - Data to generate the labels from
 * @param {Array} labelData - Constant label data defined in keg-cli/constants/docker/labels
 * @param {string} composeService - The docker-compose service the label will be added to
 * 
 * @returns {string} - Built host url label for the proxy
 */
const buildProxyHost = (data, labelData, labelContext) => {
  const [ key, valuePath, label ] = labelData

  const value = getProxyHost(get(data, `contextEnvs.${key}`, get(data, valuePath)), labelContext)

  return buildLabel(
    label,
    key,
    value,
    labelContext
  )

}

/**
 * Gets the value for the label
 * @param {Object} data - Data to generate the labels from
 * @param {Array} labelData - Constant label data defined in keg-cli/constants/docker/labels
 * 
 * @returns {string} - Found label value
 */
const getLabelItem = (data, labelData, labelContext) => {
  const [ key, valuePath, label ] = labelData
  if(key == 'KEG_PROXY_HOST') return buildProxyHost(data, labelData, labelContext)

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
const buildLabels = (generated, data, labelData, labelContext) => {

  const item = getLabelItem(data, labelData, labelContext)

  item && (generated += `      - ${item}\n`)

  return generated
}

/**
 * Loops over the pre-defined docker-compose label constants, and adds their value
 * @param {string} generated - Already generated labels
 * @param {Object} data - Data to generate the labels from
 *
 * @returns {string} - Updated generated labels with new labels added to it
 */
const generateComposeLabels = (generated = '', data, context) => {
  const labelContext = context || get(data, 'params.__injected.context', get(data, 'params.context', get(data, 'contextEnvs.IMAGE')))

  const genLabels = proxyLabels.reduce((labels, item) => {
    return buildLabels(labels, data, item, labelContext)
  }, generated)

  return kegLabels.reduce((labels, item) => {
    return buildLabels(labels, data, item, labelContext)
  }, genLabels)
}


module.exports = {
  generateComposeLabels
}