const fs = require('fs')
const path = require('path')
const { template } = require('@keg-hub/jsutils')
const { buildExports } = require('../configs/buildExports')
const buildOutputPath = path.join(__dirname, `../build`)

/**
 * Platforms to generate the export file for and their extensions
 * @Object
 */
const platforms = {
  web: '.js',
  native: '.native.js',
}

/**
 * Export types and templates for generating the exported files
 * @Object
 */
const exportTypes = {
  cjs: "module.exports = require('./${exportPath}')",
  esm: "export * from './${exportPath}'",
}

/**
 * Saves the passed in content to the generated savePath
 * Builds the savePath from the exportPath, and root build output directory
 * @function
 * @param {string} exportPath - Save path relative to the build directory
 * @param {string} content - Content to save to the file
 * @param {string} folder - Sub-folder to save the file into
 *
 * @return {void}
 */
const saveToFile = (exportPath, content, folder) => {
  const savePath = path.join(buildOutputPath, folder, exportPath)
  fs.writeFileSync(savePath, content, 'utf8')
}

/**
 * Loops over the platforms and buildExports and export types
 * Then generates an export template to be save into the build folder
 * @function
 * @return {void}
 */
const generateIndexFiles = async () => {
  Object.keys(platforms).map(platform => {
    Object.keys(buildExports).map(name => {
      Object.keys(exportTypes).map(type => {
        const exportName = `${name}${platforms[platform]}`
        const exportPath = `${platform}/${name}.js`
        const content = template(exportTypes[type], { exportPath })
        saveToFile(exportName, content, type)
      })
    })
  })
}

!module.parent
  ? generateIndexFiles()
  : (module.exports = { generateIndexFiles })
