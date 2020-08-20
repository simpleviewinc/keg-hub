const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const reThemeNM = `node_modules/@simpleviewinc/re-theme/`
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

export default function buildHook(platform){
  return {
    name: 'buildHook',
    buildEnd: async () => {
      try {

        // Only run the build hook if inside a container
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
