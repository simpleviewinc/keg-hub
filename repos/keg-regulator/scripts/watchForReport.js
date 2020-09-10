#!/usr/bin/env node

const { spawnCmd } = require('@keg-hub/spawn-cmd')
const reports_path="src/reports/cucumber/index.html" 
const polling_interval=500

;( async () => {

  const cwd = process.cwd()
  const options = { env: { polling_interval }}

  // Wait until the report is ready
  await spawnCmd('node', {
    cwd,
    options,
    args: [ './scripts/waitForCreate.js', reports_path ],
  })

  // Now open in a browser
  await spawnCmd('node', {
    cwd,
    options,
    args: [ './scripts/openURL.js', reports_path ],
  })

})()
