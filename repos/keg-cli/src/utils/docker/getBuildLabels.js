const homeDir = require('os').homedir()
const { DOCKER } = require('KegConst/docker')
const { kegLabels } = require('KegConst/docker/labels')
const { isArr, isStr, get, exists } = require('@keg-hub/jsutils')
const { fillTemplate } = require('KegUtils/template/fillTemplate')

const kegHubRepos = `keg-hub/repos/`

/**
 * Cleans up the label value when it's a local path
 * @param {string} value - Value to set to the label
 * @param {string} key - ENV Keg from the context envs that holds the label value
 * @param {Object} contextEnvs - The envs for the docker image
 *
 * @returns {string} - Docker command with the passed in labels added
 */
const cleanUpValue = value => {
  // If no value to add, just return
  if(!exists(value) || !isStr(value)) return value

  // Remove the keg-hub repos path for any paths that are ENVs
  value.indexOf(kegHubRepos) &&
    (value = value.split(kegHubRepos).pop())

  // Remove the homeDir of the current user for any paths that are ENVs
  ;value.indexOf(homeDir) === 0 &&
    (value = value.replace(homeDir, ''))

  return value
}

/**
 * Formats the custom docker labels into an array
 * @param {string|Array} labels - Custom labels to be added
 *
 * @returns {Array} - All custom labels to add to the image
 */
const buildCustomLabels = labels => {
  return !labels || !labels.length 
    ? ''
    : isStr(labels)
      ? `--label ${labels.split(',').join(` --label `)}`.trim()
      : isArr(labels)
        ? `--label ${labels.join(` --label `)}`.trim()
        : ''
}

/**
 * Replaces a placeholder value with the real value on a label
 * <br/>Used when building a container, and adding default labels
 * @param {string} cmdWithLabels - docker command with generated labels
 * @param {string} label - Label to be built
 * @param {Object} args - Arguments passed to the task
 * @param {string} key - Key of the label to be replaced
 * @param {string} value - Value of the label to be replaced
 *
 * @returns {string} - Docker command with default labels added
 */
const buildLabel = (cmdWithLabels, label, args, key, value) => {

  // TODO: Investigate if this is needed
  // The fillTemplate call should already handle this type of template so validate if this is needed
  const regReplace = new RegExp('{{\\s*' + key + '\\s*}}')

  const regTemplate = new RegExp('\\${\\s*' + key + '\\s*}')

  const builtLabel = fillTemplate({ template: label, data: { ...args, [key]: value }})
    .replace(regReplace, value)
    .replace(regTemplate, value)
    .trim()

  return builtLabel
    ? `${cmdWithLabels} --label ${builtLabel}`.trim()
    : cmdWithLabels

}

/**
 * Build the default keg-cli docker labels, and adds them to the passed in docker command
 * @param {Object} args - Arguments passed to the task
 * @param {Object} args.params - Data to build the docker command
 * @param {string} dockerCmd - docker command being built 
 *
 * @returns {string} - Docker command with default labels added
 */
const buildDefaultLabels = (args, dockerCmd) => {
  const { params={} } = args
  const { context } = params
  const { ENV:contextEnvs } = get(DOCKER, `CONTAINERS.${context.toUpperCase()}`)

  return kegLabels.reduce((cmdWithLabels, labelData) => {
    const [ key, valuePath, label ] = labelData

    const value = cleanUpValue(
      get(contextEnvs, key.toUpperCase(), get(args, valuePath))
    )

    return value
      ? buildLabel(cmdWithLabels, label, args, key, value)
      : cmdWithLabels

  }, dockerCmd)

}

/**
 * Build docker labels, and adds them to the passed in docker command
 * @param {Object} args - Arguments passed to the task
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {string} params.dockerCmd - docker command being built
 * @param {string} params.context - Name of the image to be built
 * @param {string} params.tap - Tap name of the image to be built 
 * @param {Array} params.labels - Extra labels to add to the built image
 *
 * @returns {string} - Docker command with labels added
 */
const getBuildLabels = (args, dockerCmd='') => {
  const cmdWithLabels = buildDefaultLabels(args, dockerCmd)
  const labels = get(args, 'params.labels')

  return labels
    ? `${cmdWithLabels} ${buildCustomLabels(labels)}`
    : cmdWithLabels

}

module.exports = {
  getBuildLabels,
  buildLabel
}