const fs = require('fs')
const path = require('path')
const { template } = require('@keg-hub/jsutils')
const { generateBuildInputs } = require('./generateBuildInputs')
const buildOutputPath = path.join(__dirname, `../build`)

/**
 * Platforms to generate the export file for and their extensions
 * @Object
 */
const platforms = {
  web: '',
  native: '.native',
}

/**
 * Export types and templates for generating the exported files
 * @Object
 */
const exportTypes = {
  cjs: "module.exports = require('./${exportPath}')\n",
  esm: "export * from './${exportPath}'\n",
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
const saveToFile = (exportPath, content, folder='') => {
  const savePath = path.join(buildOutputPath, folder, exportPath)
  fs.writeFileSync(savePath, content, 'utf8')
}

/**
 * Loops over the platforms and generateBuildInputs and export types
 * Then generates an export template to be save into the build folder
 * @function
 * @return {void}
 */
const generateIndexFiles = async () => {
  const buildInputs = generateBuildInputs()
  Object.keys(platforms).map(platform => {
    Object.keys(buildInputs).map(name => {
      // For now only generate the index exports
      // We may want to generate exports for all files
      // at some point, so leaving this as is for now
      if (name !== 'index') return

      Object.keys(exportTypes).map(type => {
        const ext = type === 'esm' ? 'mjs' : 'js'
        const exportName = `${name}${platforms[platform]}.${ext}`
        const exportPlatformPath = `${platform}/${name}.${ext}`
        const exportTypePath = `${type}/${name}`
        // Save the platform index file ( web || native )
        saveToFile(exportName, template(exportTypes[type], { exportPath: exportPlatformPath }), type)

        // Save the js type index file ( cjs || mjs )
        platform !== 'native' &&
          saveToFile(exportName, template(exportTypes[type],  { exportPath: exportTypePath }))
      })
    })
  })
}

!module.parent
  ? generateIndexFiles()
  : (module.exports = { generateIndexFiles })
