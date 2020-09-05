const util = require('util')
const exec = util.promisify(require('child_process').exec)
const rootDir = require('app-root-path').path

/**
 * Setup git assume-unchange on all items in a folder
 * @param {string} folderName - folder you want to set assume-unchange to
 *
 * @returns {void}
 */
const assumeUnchange = async folderName => {
  if (process.env.DOC_APP_PATH) return

  try {
    console.log(`git update assume-unchange folder: ${folderName}`)
    await exec(
      `cd ${rootDir} && git update-index --assume-unchanged ${folderName}/*/*`
    )
  }
  catch (error) {
    console.error(error.stderr)
    console.log(
      `Try manually running 'git update-index --assume-unchanged ${folderName}/*/*'`
    )
  }
}

module.exports = {
  assumeUnchange,
}
