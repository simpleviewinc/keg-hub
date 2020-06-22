const fs = require('fs')
const path = require('path')
const { checkCall, limbo } = require('jsutils')
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
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 *
 * @returns {Promise|Array} - Array of found items
 */
const getFolderContent = async (fromPath, opts={}) => {

  const { full, type, filters=[] } = opts

  const [ err, allFiles ] = await readDir(fromPath)
  err && generalError(err)

  return allFiles.reduce(async (toResolve, file) => {
    const allFound = await toResolve

    // Filter out any files matching the filters
    if(!file || filters.indexOf(file) !== -1)
      return allFound

    // Check if we should use the full path
    const found = full ? path.join(fromPath, file) : file

    // If no type, then add and return
    if(!type) return allFound.concat([ found ])
    
    // Check if the path is a directory
    const [ statErr, fileStat ] = await stat(path.join(fromPath, file))
    statErr && generalError(statErr)

    const isDir = fileStat.isDirectory()

    // Check the type and return based on type
    return (type === 'folder' && isDir) || (type !== 'folder' && !isDir)
      ? allFound.concat([ found ])
      : allFound

  }, Promise.resolve([]))

}

/**
 * Gets all files in a directory path
 * @function
 * @param {string} fromPath - Path to find the folders in
 * @param {boolean} full - Should return the full path
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
 * @param {boolean} full - Should return the full path
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
 *
 * @returns {Array} - All folders found in the path
 */
const getFoldersSync = fromPath => {
  return fs.readdirSync(fromPath)
    .filter(f => fs.statSync(path.join(fromPath, f)).isDirectory())
}

/**
 * Gets all files in a directory path synchronously
 * @function
 * @param {string} fromPath - Path to find the files in
 *
 * @returns {Array} - All files found in the path
 */
const getFilesSync = fromPath => {
  return fs.readdirSync(fromPath)
    .filter(f => !fs.statSync(path.join(fromPath, f)).isDirectory())
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

module.exports = {
  copyFile,
  copyFileSync,
  copyStream,
  getFiles,
  getFilesSync,
  getFolders,
  getFoldersSync,
  getFolderContent,
  mkDir,
  movePath,
  pathExists,
  pathExistsSync,
  readFile,
  readFileSync,
  removeFile,
  removeFileSync,
  stat,
  writeFile,
  writeFileSync,
}