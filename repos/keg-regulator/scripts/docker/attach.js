#!/usr/bin/env node

const { docker } = require("./docker")

;(async () => {

  await docker([
    'exec',
    '-it',
    'keg-regulator',
    'bash'
  ])

})()
