const fs = require('fs')
const path = require('path')
const { getAliases } = require('../configs/aliases.config')

const { DEV_MODE, BUILD_HOOK } = process.env

/**
 * Folder names that contain files to be exported
 * @type {Array}
 */
const parentFolders = [
  'components',
  'hocs',
  'hooks',
  'utils'
]

/**
 * List of partial file and folder names that should be ignored when building the rollup inputs
 * @type {Array}
 */
const getIgnoreList = (isNative) => ([
  // folders
  'internal',
  '__tests__',

  // files
  '.stories.',
  '.examples.',
  '.wrapper.',
  'index.js',
  !isNative && '.native.'
])

/**
 * gets the files at a given directory
 * @param {string} dir 
 * @param {Array<string>} exclude - used to filter out the files 
 * 
 * @returns {Array<string>} - a list of the file names with extension
 */
const getFilesFromDir = (dir, exclude=[]) => {
  const files = fs.readdirSync(dir)
  return exclude.length 
    ? files.filter(file => !exclude.some(excludeItem => file.includes(excludeItem))) 
    : files
}


/**
 * returns the .native counterpart if it exists
 * @param {string} current - current filename
 * @param {Array<string>} list - array containing the files available
 * 
 * @returns {string|null}
 */
const getNativeFile = (current='', list=[]) => {
  return list.find(element => 
    element === current.replace('.js', '.native.js')
  ) || null
}

/**
 * Creates the mapping per directory
 * @param {string} dir
 * @param {boolean} isNative - if we're building for native or not
 * @param {Array<string>} items - array containing filenames and/or folder names
 * @param {Array<string>} ignoreList - which file/folders to ignore
 * 
 * @returns {object}
 */
const createExportMappings = (dir, isNative, items=[], ignoreList=[]) => {

  return items.reduce((obj, item) => {
    const newPath = path.join(dir, item)
    const isDir = fs.lstatSync(newPath).isDirectory()

    // if item is a folder, go iterate over it
    if (isDir) {
      const newItems = getFilesFromDir(newPath, ignoreList)
      const newObj = createExportMappings(newPath, isNative, newItems, ignoreList)
      // append to the original object
      Object.assign(obj, newObj)
    }
    else {
      const nativeFile = isNative && getNativeFile(item, items)
      const file = nativeFile || item
      const nameWithoutExtension = file.split('.')[0] || file
      Object.assign(obj, {
        // ex: button: 'dir/button.js'
        [nameWithoutExtension]: path.join(dir, file)
      })      
    }
    return obj

  }, {})
}


/**
 * dynamically generates the export mapping per file
 * @param {string} rootDir 
 * @param {string} platform - web or native
 * 
 * @returns {object} - something like 
 *   native: { linearGradient: src/components/linearGradient/linearGradient.native.js,... }
 *   web: { linearGradient: 'src/components/linearGradient/linearGradient.js', ... }
 */
const getMappings = (rootDir, platform) => {
  
  const isNative = platform === 'native'
  const ignoreList = getIgnoreList(isNative)
  
  const rootArr = getFilesFromDir(rootDir, ignoreList)
  const inputs = {}
  rootArr.forEach((val) => {
    if (!parentFolders.includes(val)) return

    const newPath = path.join(rootDir, val)
    const newList = getFilesFromDir(newPath, ignoreList)
    Object.assign(inputs, createExportMappings(newPath, isNative, newList, ignoreList))
  })

  return inputs
}

 /**
  * setup the input files for specific exports
  * @param {string} platform - web or native
  * 
  * @returns {object} - object containing specific exports
  */
const generateBuildInputs = (platform) => {
  return {
    theme: 'src/theme',
    index: 'src/index.js',
    ...getMappings('./src', platform)
  }
}


module.exports = {
  generateBuildInputs
}