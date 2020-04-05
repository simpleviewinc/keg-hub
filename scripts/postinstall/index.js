const path = require('path')
const rootDir = path.join(__dirname, '../../')
const bashIndex = path.join(rootDir, 'keg')
const nodeIndex = path.join(rootDir, 'keg-cli')
const { makeExecutable } = require('./makeExecutable')
const { runCliSetup } = require('../setup/runCliSetup')

;(async () => {

  // Makes <root_dir>/keg executable
  await makeExecutable(bashIndex)

  // Makes <root_dir>/keg-cli executable
  await makeExecutable(nodeIndex)

  // Run bash / bat setup keg cli setup files to initialize the keg-cli
  // await runCliSetup(rootDir)

})()