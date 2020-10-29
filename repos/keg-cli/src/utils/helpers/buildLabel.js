/**
 * Build the default keg-cli docker labels, and adds them to the passed in docker command
 * @param {string} labelStr - String of already added labels 
 * @param {string} labels - Array of labels to be added
 * @param {string} key - ENV Keg from the context envs that holds the label value
 * @param {string} value - Value to set to the label
 *
 * @returns {string} - Docker command with the passed in labels added
 */
const buildLabel = (labelStr, labels, key, value) => {
  return labels.reduce((cmdWLabels, label) => {
    if(!key && !value) return `${cmdWLabels} --label ${label}`.trim()
    
    const regReplace = new RegExp('{{\\s*' + key + '\\s*}}')
    const regTemplate = new RegExp('\\${\\s*' + key + '\\s*}')

    return cmdWLabels += (
      ' ' + `--label ` + label
      .replace(regReplace, value)
      .replace(regTemplate, value)
      .trim()
    )
  }, labelStr).trim()
}

module.exports = {
  buildLabel
}
