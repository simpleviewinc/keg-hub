const { kegLabels, proxyLabels } = require('KegConst/docker/labels')
const { get, eitherArr } = require('@keg-hub/jsutils')
const { fillTemplate } = require('KegUtils/template')
const { getProxyHost } = require('./getProxyHost')

/**
 * Generates a docker-compose label from the passed in arguments
 * @param {string} generated - Already generated labels
 * @param {Object} data - Data to generate the labels from
 * @param {Array} labelData - Constant label data defined in keg-cli/constants/docker/labels
 *
 * @returns {string} - Updated generated labels with new labels added to it
 */
const buildLabel = (generated, data, labelData) => {
  const [ key, valuePath, label ] = labelData
  const lookupPaths = eitherArr(valuePath, [ valuePath ])
  
  const value = key !== 'KEG_PROXY_HOST'
    ? lookupPaths.reduce((found, lookup) => found || get(data, lookup), '')
    : getProxyHost(
        get(data, valuePath, get(data, `contextEnvs.${key}`)),
        get(data, 'contextEnvs.IMAGE', get(data, 'contextEnvs.CONTAINER'))
      )

  const item = value ? fillTemplate({ template: label, data: { ...data, [key]: value }}) : label
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
const generateComposeLabels = (generated = '', data) => {

  const genLabels = proxyLabels.reduce((labels, item) => {
    return buildLabel(labels, data, item)
  }, generated)

  return kegLabels.reduce((labels, item) => {
    return buildLabel(labels, data, item)
  }, genLabels)
}


module.exports = {
  generateComposeLabels
}