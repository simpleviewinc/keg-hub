const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const reThemeNM = `node_modules/@keg-hub/re-theme/`
const { DOC_APP_PATH, DOC_RETHEME_PATH } = process.env

const runCmd = cmd => {
  try { return cmdExec(cmd) }
  catch(err){ console.error(err.stack) }
}

const getFolderPath = (loc1, loc2, condition) => {
  const foundPath = condition
    ? loc1
    : loc2

  return foundPath && foundPath[ foundPath.length -1 ] === '/'
    ? foundPath
    : `${foundPath}/`
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

export default function buildHook(platform, ext){
  return {
    name: 'buildHook',
    buildEnd: async () => {
      try {

        // Only run the build hook if NOT inside a container
        if(!DOC_APP_PATH || platform === 'web' || ext === 'cjs') return

        // Build the index files for the build export
        writeIndexes(buildIndexes.cjs)
        writeIndexes(buildIndexes.esm)

        // Check if we are running the container for ReTheme
        // The retheme folder path and the app path will be the same
        // Otherwise retheme is a node_module in a different app
        const isReThemeContainer = DOC_RETHEME_PATH === DOC_APP_PATH

        // Get the root app path base on the container it's being running
        const rootPath = getFolderPath(
          path.join(__dirname, '../app'),
          `${DOC_APP_PATH}/`,
          isReThemeContainer
        )

        // Get the path for retheme 
        const reThemePath = getFolderPath(path.join(__dirname, '../'), false, true)

        // Get the node_module path base on the rootPath
        const nmPath = getFolderPath(
          `${rootPath}${reThemeNM}`,
          DOC_RETHEME_PATH,
          isReThemeContainer
        )

        // If the current node_module path is not the same as the retheme build path
        // Then copy the build folder into the node_module path
        reThemePath !== nmPath &&
          fs.existsSync(`${reThemePath}build`) &&
          fs.existsSync(`${nmPath}build`) &&
          setTimeout(async () => {
            console.log(`Copying reTheme build to app node_modules...`)
            await runCmd(`rm -Rf ${ nmPath }build`)
            await runCmd(`cp -Rf ${reThemePath}build ${ nmPath }build`)
          // Wait a second for all the build files to be created
          }, 1000)

      }
      catch(err){
        console.error(err.stack)
        process.exit(1)
      }

    }
  }
} 
