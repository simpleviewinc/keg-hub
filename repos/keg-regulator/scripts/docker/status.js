#!/usr/bin/env node

const { docker } = require("./docker")

;( async () => {

  await docker([
    'container',
    'list',
    '-a'
  ])

})()
