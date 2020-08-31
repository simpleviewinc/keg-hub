#!/usr/bin/env node

const { docker } = require("./docker")

;(async () => {

  await docker([
    'logs',
    'keg-regulator',
    '--follow'
  ])

})()
