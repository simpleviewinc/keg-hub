const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname)
const appRoot = require('app-root-path').path
const isRootPackage = appRoot.indexOf('/node_modules/') === -1

/**
 * Sets up zr-rn-taps folder in node_modules ( temporary )
 */
const setupRNTap = () => {
  const rnTapFiles = [
    path.join(rootDir, './node_modules/external-test-taps'),
    path.join(rootDir, './node_modules/external-test-taps/taps'),
    path.join(rootDir, './taps'),
  ]
  rnTapFiles.map(file => !fs.existsSync(file) && fs.mkdirSync(file))
}

/**
 * Make a temp directory to store tap config files
 */
const makeTempFolder = () => {
  // Build the temp directory path
  const tempDir = path.join(__dirname, './temp')
  // make the directory if it doesn't exist
  !fs.existsSync(tempDir) && fs.mkdirSync(tempDir)
}

makeTempFolder()

// Ensure the external-test-taps folder exists
isRootPackage && setupRNTap()