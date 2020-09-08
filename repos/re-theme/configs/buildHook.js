const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const reThemeNM = `node_modules/@keg-hub/re-theme/`
const { DOC_APP_PATH, DOC_RETHEME_PATH } = process.env

const runCmd = async (cmd) => {
  try {
    const output = await cmdExec(cmd)
    return output
  }
  catch(err){
    console.error(err.stack)
  }

}

const buildPath = path.join(__dirname, `../build`)
const buildIndexes = {
  cjs: {
    [path.join(buildPath, 'cjs/index.js')]: `'use strict'\nmodule.exports = require('./web')\n`,
    [path.join(buildPath, 'cjs/index.native.js')]: `'use strict'\nmodule.exports = require('./native')\n`,
  },
  esm: {
    [path.join(buildPath, 'esm/index.js')]: `export * from './web'\n`,
    [path.join(buildPath, 'esm/index.native.js')]: `export * from './native'\n`,
  }
}

const writeIndexes = indexes => {
  Object.entries(indexes).map(([filePath, content]) => {
    fs.writeFileSync(filePath, content)
  })
}

export default function buildHook(platform){
  return {
    name: 'buildHook',
    buildEnd: async () => {
      try {

        // Build the index files for the build export
        if(platform !== 'native'){
          writeIndexes(buildIndexes.cjs)
          writeIndexes(buildIndexes.esm)
        }

        // Only run the build hook if NOT inside a container
        if(!DOC_APP_PATH || platform === 'native') return
        


        // Check if we are running the container for ReTheme
        // The retheme folder path and the app path will be the same
        // Otherwise retheme is a node_module in a different app
        const isReThemeContainer = DOC_RETHEME_PATH === DOC_APP_PATH

        // Get the root app path base on the container it's being runing
        const rootPath = isReThemeContainer
          ? path.join(__dirname, '../app')
          : `${DOC_APP_PATH}/`

        // Get the path for retheme 
        const reThemePath = isReThemeContainer
          ? rootPath
          : path.join(__dirname, '../')

        // Get the node_module path base on the rootPath
        const nmPath = isReThemeContainer
          ? `${rootPath}app/${reThemeNM}`
          : DOC_RETHEME_PATH

        // If the current node_module path is not the same as the retheme build path
        // Then copy the build folder into the node_module path
        ;(reThemePath !== nmPath && reThemePath !== `${nmPath}/`) &&
          fs.existsSync(`${reThemePath}build`) &&
          await runCmd(`command cp -Rf ${reThemePath}build ${ nmPath }`)

      }
      catch(err){
        console.error(err.stack)
        process.exit(1)
      }

    }
  }
} 
