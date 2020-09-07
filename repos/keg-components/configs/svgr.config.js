/*
  Using @svgr/cli
  * Default => `npx @svgr/cli <path to svg>`
  * With this config => `npx @svgr/cli --config-file configs/svgr.config.js <path to svg>`
  * Or using script in package.json => `yarn svg:convert <path to svg>`
  * 
  * Example
  * yarn svg:convert src/assets/icons/check_to_convert/solid.svg
  * 
*/

const path = require('path')
const rootPath = path.join(__dirname, '../')
let outDir = 'src/assets'

// Get the directory of the svg and use that as the output dir
// This way the converted js version is saved in the same location
;(() => {
  try {
    const args =  JSON.parse(process.env.npm_config_argv)
    const [ _, svgPath ] = args.original

    const split = svgPath.split('/')
    split.pop()
    outDir = path.join(rootPath, split.join('/'))
  }
  catch(e){
    outDir = 'src/assets'
  }
})()

module.exports = {
  ext: 'js',
  native: true,
  outDir: outDir
}
