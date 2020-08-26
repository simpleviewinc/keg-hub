const path = require('path')
const { KegTpl } = require('KegTpl')
const { readFile, readFileSync, getFiles } = require('KegFileSys')
const { CLI_ROOT } = require('KegConst/constants')
const { get, mapObj, template } = require('@svkeg/jsutils')
const { generalError } = require('../error/generalError')

// Cache holder for our templates
let __TEMPLATES

/**
 * Override the default replace string with  {{ temp variable }}
 * @function
 *
 * @returns {void}
 */
const setTemplateRegex = () => {
  template.regex = /{{([^}]*)}}/g
}

/**
 * Loads a template by name, by loading all files in the template folder
 * <br/> Then using the passed in name, finds the template with the same name
 * @param {string} name - Name of the template
 * @param {Object} data - Data to fill the template
 *
 * @returns {string} - Loaded template, with it's content filled
 */
const loadTemplate = async (name, data={}) => {
  const templateFiles = await getFiles(KegTpl, { filters: [ 'index.js' ] })
  __TEMPLATES = __TEMPLATES || templateFiles.reduce((mapped, file) => {
    const name = file.split('.').shift()
    mapped[name] = path.join(KegTpl, file)

    return mapped
  }, {})

  return __TEMPLATES[name]
    ? template(readFileSync(__TEMPLATES[name]), data)
    : generalError(`Template with name "${name}" does not exist!`)

}

/**
 * Loads a templates content from the passed in loc string
 * @param {string} loc - Location to load the template from
 * @param {boolean} fromRoot - Load the template from the CLI_ROOT
 *
 * @returns {string} - Non-Filled template content
 */
const getTemplate = async (filePath, fromRoot=false) => {
  const location = fromRoot
    ? path.join(CLI_ROOT, filePath)
    : filePath

  return readFile(location)
}

/**
 * Loads a template from a file path, and fills it form the passed in data
 * @param {string} loc - Location to load the template from
 * @param {Object} data - Data to fill the template
 * @param {string} root - Root location to load the template from
 *
 * @returns {string} - Template with the content filled from the passed in data
 */
const fillFromPath = async (loc, data, root) => {
  const [ err, content ] = await getTemplate(loc, root)
  return err ? generalError(err) : template(content, data)
}

/**
 * Loads and fills a template from the passed in data
 * @param {Object} args - Arguments to load an fill the template
 *
 * @returns {string} - Template with the content filled from the passed in data
 */
const fillTemplate = ({ template:tmp, loc, data={}, root }) => {
  // Re-set the template regex to ensure it's set
  setTemplateRegex()

  return !tmp && loc
    ? fillFromPath(loc, data, root)
    : tmp && template(tmp, data)
}

module.exports = {
  fillTemplate,
  loadTemplate
}