const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname)

/**
 * Sets up zr-rn-clients folder in node_modules ( temporary )
 */
const setupRNClient = () => {
  const rnClientFiles = [
    path.join(rootDir, './node_modules/external-test-clients'),
    path.join(rootDir, './node_modules/external-test-clients/clients'),
    path.join(rootDir, './clients'),
  ]
  rnClientFiles.map(file => !fs.existsSync(file) && fs.mkdirSync(file))
}

// Ensure the external-test-clients folder exists
setupRNClient()
