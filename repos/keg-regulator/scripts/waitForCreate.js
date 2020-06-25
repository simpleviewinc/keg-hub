const chokidar = require('chokidar')
const fs = require('fs')

/**
 * waitForCreate.js
 * Waits until the file at path is created. If it already exists, exits immediately.
 * Example: node waitForCreate.js /path/to/file
 * @param {String} arg1: path - path to file
 */
const [ path ] = process.argv.slice(2)

const onPathFound = () => {
  console.log(`${path} was found. Exiting...`)
  process.exit(0)
}

fs.existsSync(path) && onPathFound()

chokidar
  .watch(path)
  .on('add', onPathFound)
