/*
  Using @svgr/cli
  * Default => `npx @svgr/cli <path to svg>`
  * With this config => `npx @svgr/cli --config-file configs/svgr.config.js <path to svg>`
  * Or using script in package.json => `yarn svg:convert <path to svg>`
  * 
  * Example
  * yarn svg:convert <path to svg>
  * yarn svg:folder <path to folder of svgs>
  * 
  * Set the SVG_EXPORT_PATH env to set the output directory
  * Defaults to src/assets folder
*/

module.exports = {
  ext: 'js',
  native: true,
  outDir: process.env.SVG_EXPORT_PATH || 'src/assets'
}
