const fs = require('fs')
const path = require('path')
const { checkCall, limbo, isFunc } = require('@svkeg/jsutils')
const { generalError } = require('KegUtils/error')

/**
 * Wraps a method with a callback into a promise
 * @function
 * @param {*} cb - method to wrap in a promise
 * @param {*} args - Arguments to pass to the callback method
 *
 * @returns {Promise|*} - Success response of fs.rename method
 */
const limboify = (cb, ...args) => {
  return limbo(
    new Promise((res, rej) => cb(...args, (err, success) => 
      err? rej(err) : res(success || true) 
    ))
  )
}

/**
 * Copy a file from one location to another
 * @function
 * @param {*} oldPath - Copy from location
 * @param {*} newPath - Copy to location
 *
 * @returns {Promise|*} - Success response of fs.rename method
 */
const movePath = (oldPath, newPath) => {
  return limboify(fs.rename, oldPath, newPath)
}

/**
 * Makes a directory at the passed in folderPath
 * @function
 * @param {string} folderPath - Folder path to create
 *
 * @returns {Promise|boolean} - Success creating the directory
 */
const mkDir = filePath => {
  return limboify(fs.mkdir, filePath, { recursive: true })
}

/**
 * Writes a file to the local HHD
 * @function
 * @param {string} filePath - Path to where the file should be written
 * @param {*} data - Contents to be written to the file
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|boolean} - True if the file was written successfully
 */
const writeFile = (filePath, data, format='utf8') => {
  return limboify(fs.writeFile, filePath, data, format)
}

/**
 * Writes a file to the local HHD synchronously
 * @function
 * @param {string} filePath - Path to where the file should be written
 * @param {*} data - Contents to be written to the file
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|boolean} - True if the file was written successfully
 */
const writeFileSync = (filePath, data, format='utf8') => {
  return fs.writeFileSync(filePath, data, format)
}

const readDir = (dirPath) => {
  return limboify(fs.readdir, dirPath)
}

/**
 * Checks if a path exists using fs.stat wrapped in a promise
 * @function
 * @param {string} path - Path to Check
 *
 * @returns {Promise|boolean} - True if the file exists
 */
const stat = (path) => {
  return limboify(fs.stat, path)
}

/**
 * Gets the content of a folder based on passed in options
 * @function
 * @param {string} fromPath - Path to get the content from
 * @param {Array} allFound  - Past found file paths
 * @param {string} file - File path to check if should be added to allFound array
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Array} - Array of found file paths
 */
const buildFoundArray = ({ allFound, recurCall, file, fromPath, opts={} }) => {
  
  const { exclude=[], full, include=[], recursive, type } = opts

  // Filter out any folder matching the exclude
  if(!file || exclude.indexOf(file) !== -1) return allFound

  // Get the full path of the file or folder
  const fullPath = path.join(fromPath, file)

  // Check if we should use the full path or relative
  const found = full ? fullPath : file

  // Check if its a directory
  const isDir = fs.statSync(fullPath).isDirectory()

  // Check if found should be added to the array based on the passed in arguments
  // Check the for type match or no type
  ;( !type ||
    ( type === 'folder' && isDir ) ||
    ( type !== 'folder' && !isDir )) &&
    ( !include.length || include.indexOf(file) !== -1 ) &&
    allFound.push(found)

  return !isDir || !recursive || !isFunc(recurCall)
    ? allFound
    : recurCall(fullPath, opts, allFound)

}

/**
 * Gets the content of a folder based on passed in options
 * @function
 * @param {string} fromPath - Path to get the content from
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Promise|Array} - Array of found items
 */
const getFolderContent = async (fromPath, opts={}, foundPaths=[]) => {
  const [ err, allFiles ] = await readDir(fromPath)
  err && generalError(err)

  return allFiles.reduce(async (toResolve, file) => {
    const allFound = await toResolve

    return buildFoundArray({
      opts,
      file,
      fromPath,
      allFound,
      recurCall: getFolderContent,
    })
  }, Promise.resolve(foundPaths))

}

/**
 * Gets the content of a folder based on passed in options synchronously
 * @function
 * @param {string} fromPath - Path to get the content from
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Promise|Array} - Array of found items
 */
const getFolderContentSync = (fromPath, opts={}, foundPaths=[]) => {
  return fs.readdirSync(fromPath)
    .reduce((allFound, file) => buildFoundArray({
      opts,
      file,
      fromPath,
      allFound,
      recurCall: getFolderContentSync,
    }), foundPaths)
}

/**
 * Gets all files in a directory path
 * @function
 * @param {string} fromPath - Path to find the folders in
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Array} - All files found in the path
 */
const getFiles = (fromPath, opts) => {
  return getFolderContent(fromPath, { ...opts, type: 'file' })
}

/**
 * Gets all folders in a directory path
 * @function
 * @param {string} fromPath - Path to find the folders in
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Array} - All folders found in the path
 */
const getFolders = (fromPath, opts) => {
  return getFolderContent(fromPath, { ...opts, type: 'folder' })
}

/**
 * Gets all folders in a directory path synchronously
 * @function
 * @param {string} fromPath - Path to find the folders in
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Array} - All folders found in the path
 */
const getFoldersSync = (fromPath, opts={}) => {
  return getFolderContentSync(fromPath, { ...opts, type: 'folder' })
}

/**
 * Gets all files in a directory path synchronously
 * @function
 * @param {string} fromPath - Path to find the files in
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Array} - All files found in the path
 */
const getFilesSync = (fromPath, opts) => {
  return getFolderContentSync(fromPath, { ...opts, type: 'file' })
}

/**
 * Checks if a file path exists on the local HHD
 * @function
 * @param {string} checkPath - Path to check if exists
 *
 * @returns {Promise|boolean} - True if the path exists, false if not
 */
const pathExists = checkPath => {
  return limboify(fs.access, checkPath, fs.constants.F_OK)
}

/**
 * Checks if a file path exists on the local HHD
 * @function
 * @param {string} checkPath - Path to check if exists
 *
 * @returns {Promise|boolean} - True if the path exists, false if not
 */
const pathExistsSync = checkPath => fs.existsSync(checkPath)

/**
 * Reads a file from local HHD, and returns the contents
 * @function
 * @param {string} filePath - Path of the file to read
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|string} - Content of the file
 */
const readFile = (filePath, format='utf8') => {
  return limboify(fs.readFile, filePath, format)
}

/**
 * Reads a file from local HHD, and returns the contents synchronously
 * @function
 * @param {string} filePath - Path of the file to read
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|string} - Content of the file
 */
const readFileSync = (filePath, format='utf8') => {
  return fs.readFileSync(filePath, format='utf8')
}

/**
 * Copies from one file path to another
 * @function
 * @param {string} from - Path to copy from
 * @param {string} to - Path to copy to
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Object} - Contains the readStream and writeStream
 */
const copyStream = (from, to, cb, format='utf8') => {
  const writeStream = fs.createWriteStream(to)
  const readStream = fs.createReadStream(from, { encoding: format })
  writeStream.on('finish', () => checkCall(cb))

  readStream.pipe(writeStream)

  return { readStream, writeStream }
}

/**
 * Copies from one file path to another
 * @function
 * @param {string} from - Path to copy from
 * @param {string} to - Path to copy to
 * @param {string} [mode=1] - Copy mode - Should overwrite the file
 *
 * @returns {Promise} - Resolves after file has been copied
 */
const copyFile = (to, from, mode) => {
  return limboify(fs.copyFile, to, from, mode)
}

/**
 * Copies from one file path to another synchronously
 * @function
 * @param {string} from - Path to copy from
 * @param {string} to - Path to copy to
 * @param {string} [mode=1] - Copy mode - Should overwrite the file
 *
 * @returns {void}
 */
const copyFileSync = (from, to, mode) => fs.copyFileSync(from, to, mode)

/**
 * Removes a file from the local files system
 * @function
 * @param {string} file - Path to the file to be removed
 *
 * @returns {void}
 */
const removeFile = file => limboify(fs.unlink, file)

/**
 * Removes a file from the local files system synchronously
 * @function
 * @param {string} file - Path to the file to be removed
 *
 * @returns {void}
 */
const removeFileSync = file => fs.unlinkSync(filePath, callbackFunction)


/**
 * Wraps require in a try catch so app doesn't throw when require is called inline
 * @param {string} folder - The path to the file to require
 * @param {string} file - The file to require
 * @param {boolean} logError - If the require fails, should the app throw
 *
 * @returns {Object} - Content of the required file
 */
const requireFile = (folder='', file='', logError) => {

  const location = path.join(folder, file)

  try {
    // Build the path to the file
    // load the data
    const data = require(location)

    return { data, location }
  }
  catch (err) {
    logError &&
      console.error(`requireFile error for path "${ location }"`, err.stack)

    return {}
  }
}

/**
 * Ensures a directory exists
 * @param {string} dirPath - path to ensure
 *
 * @return {string} - directory path that was ensured
 */
const ensureDirSync = (dirPath='', logError) => {
  try {
    // make the directory if it doesn't exist
    !fs.existsSync(dirPath) && fs.mkdirSync(dirPath)

    return dirPath
  }
  catch (err) {
    logError &&
      console.error(`ensureDirSync error for path "${ dirPath }"`, err.stack)
    return false
  }
}

module.exports = {
  copyFile,
  copyFileSync,
  copyStream,
  ensureDirSync,
  getFiles,
  getFilesSync,
  getFolders,
  getFoldersSync,
  getFolderContent,
  getFolderContentSync,
  mkDir,
  movePath,
  pathExists,
  pathExistsSync,
  readFile,
  readFileSync,
  removeFile,
  removeFileSync,
  requireFile,
  stat,
  writeFile,
  writeFileSync,
}