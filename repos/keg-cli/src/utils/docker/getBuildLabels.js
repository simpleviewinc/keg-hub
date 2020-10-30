const homeDir = require('os').homedir()
const { DOCKER } = require('KegConst/docker')
const { kegLabels } = require('KegConst/docker/labels')
const { buildLabel } = require('KegUtils/helpers/buildLabel')
const { isArr, isStr, get, exists } = require('@keg-hub/jsutils')

const kegHubRepos = `keg-hub/repos/`

/**
 * Cleans up the label value when it's a local path
 * @param {string} value - Value to set to the label
 * @param {string} key - ENV Keg from the context envs that holds the label value
 * @param {Object} contextEnvs - The envs for the docker image
 *
 * @returns {string} - Docker command with the passed in labels added
 */
const cleanUpValue = (value, key, contextEnvs) => {
  // Default the compose service to the image name
  if(!value && key === 'KEG_COMPOSE_SERVICE' && contextEnvs.IMAGE)
    value = contextEnvs.IMAGE

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
 * Build the default keg-cli docker labels, and adds them to the passed in docker command
 * @param {string} dockerCmd - docker command being built
 * @param {string} context - Name of the image to be built
 * @param {string} tap - Tap name of the image to be built 
 *
 * @returns {string} - Docker command with default labels added
 */
const buildDefaultLabels = (dockerCmd, context, tap) => {
  const { ENV:contextEnvs } = get(DOCKER, `CONTAINERS.${ context.toUpperCase() }`)

  return kegLabels.reduce((cmdWLabels, labelData) => {
    const [ key, __, label ] = labelData

    const value = cleanUpValue(
      get(contextEnvs, key.toUpperCase()),
      key,
      contextEnvs
    )

    return value
      ? `${cmdWLabels} --label ${buildLabel(label, key, value, tap || context)}`.trim()
      : cmdWLabels

  }, dockerCmd)

}

/**
 * Build docker labels, and adds them to the passed in docker command
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {string} params.dockerCmd - docker command being built
 * @param {string} params.context - Name of the image to be built
 * @param {string} params.tap - Tap name of the image to be built 
 * @param {Array} params.labels - Extra labels to add to the built image
 *
 * @returns {string} - Docker command with labels added
 */
const getBuildLabels = (globalConfig, { dockerCmd='', labels, context, tap }) => {
  const cmdWLabels = buildDefaultLabels(dockerCmd, context, tap)

  return labels
    ? `${cmdWLabels} ${buildCustomLabels(labels)}`
    : cmdWLabels

}

module.exports = {
  getBuildLabels
}