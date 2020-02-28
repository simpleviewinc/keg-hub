const fs = require('fs')

/**
 *
 *
 * @param {*} oldPath
 * @param {*} newPath
 * @returns
 */
const movePath = (oldPath, newPath) => {
  return new Promise((res, rej) => {
    fs.rename(oldPath, newPath, (err, success) => err ? rej(err) : res(success))
  })
}

/**
 *
 *
 * @returns
 */
const writeFile = (filePath, data) => {
  return new Promise((res, rej) => {
    // Write the temp config file
    fs.writeFile(filePath, data 'utf8', (err) => err ? rej(err) : res(true))
  })
}

const pathExists = (checkPath) => {
  return new Promise((res, rej) => {
    const exists = fs.existsSync(checkPath)
    exists ? res(exists) : rej(false)
  })
}

module.exports = {
  movePath,
  writeFile,
}