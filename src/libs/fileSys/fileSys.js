const fs = require('fs')

/**
 * Copy a file from one location to another
 * @param {*} oldPath - Copy from location
 * @param {*} newPath - Copy to location
 *
 * @returns {Promise|*} - Success response of fs.rename method
 */
const movePath = (oldPath, newPath) => {
  return new Promise((res, rej) => {
    fs.rename(oldPath, newPath, (err, success) => err ? rej(err) : res(success))
  })
}


const mkDir = filePath => {
  return new Promise((res, rej) => {
    fs.mkdir(filePath, { recursive: true }, err => {
      err ? rej(err) : res(true)
    })
  })
}

/**
 * Writes a file to the local HHD
 * @param {string} filePath - Path to where the file should be written
 * @param {*} data - Contents to be written to the file
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|boolean} - True if the file was written successfully
 */
const writeFile = (filePath, data, format='utf8') => {
  return new Promise((res, rej) => {
    // Write the temp config file
    fs.writeFile(filePath, data, format, (err) => err ? rej(err) : res(true))
  })
}

/**
 * Writes a file to the local HHD synchronously
 * @param {string} filePath - Path to where the file should be written
 * @param {*} data - Contents to be written to the file
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|boolean} - True if the file was written successfully
 */
const writeFileSync = (filePath, data, format='utf8') => {
  return fs.writeFileSync(filePath, data, format)
}



/**
 * Checks if a file path exists on the local HHD
 * @param {string} checkPath - Path to check if exists
 *
 * @returns {Promise|boolean} - True if the path exists, false if not
 */
const pathExists = checkPath => {
  return new Promise((res, rej) => {
    return res(fs.existsSync(checkPath))
  })
}

/**
 * Checks if a file path exists on the local HHD
 * @param {string} checkPath - Path to check if exists
 *
 * @returns {Promise|boolean} - True if the path exists, false if not
 */
const pathExistsSync = checkPath => fs.existsSync(checkPath)

/**
 * Reads a file from local HHD, and returns the contents
 * @param {string} filePath - Path of the file to read
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|string} - Content of the file
 */
const readFile = (filePath, format='utf8') => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, format, (err, data) => {
      err ? rej(err) : res(data)
    })
  })
}

/**
 * Reads a file from local HHD, and returns the contents synchronously
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
 * @param {string} from - Path to copy from
 * @param {string} to - Path to copy to
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {void} - Content of the file
 */
const copyStream = (from, to, format='utf8') => {
  return fs.createReadStream(from, { encoding: format }).pipe(fs.createWriteStream(to))
}

module.exports = {
  copyStream,
  mkDir,
  movePath,
  pathExists,
  pathExistsSync,
  readFile,
  readFileSync,
  writeFile,
  writeFileSync,
}