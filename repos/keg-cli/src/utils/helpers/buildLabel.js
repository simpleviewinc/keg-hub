/**
 * Build the default keg-cli docker labels, and adds them to the passed in docker command
 * @param {string} label - label to be built
 * @param {string} key - ENV Keg from the context envs that holds the label value
 * @param {string} value - Value to set to the label
 * @param {string} context - Context the label is being built for
 * 
 * @returns {string} - Label with values replaced
 */
const buildLabel = (label='', key, value, context) => {

  const regContext = context && new RegExp('{{\\s*params.context\\s*}}')
  const builtLabel = regContext ? label.replace(regContext, context) : label

  if(!key && !value) return builtLabel.trim()

  const regReplace = new RegExp('{{\\s*' + key + '\\s*}}')
  const regTemplate = new RegExp('\\${\\s*' + key + '\\s*}')

  return builtLabel
    .replace(regReplace, value)
    .replace(regTemplate, value)
    .trim()
}

module.exports = {
  buildLabel
}
