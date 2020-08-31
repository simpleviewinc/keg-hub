#!/usr/bin/env node

const { compose, runCmd } = require("./docker")

;( async () => {

  await compose([
    '-f',
    'container/docker-compose.yml',
    '-f',
    'container/docker-compose.headless.yml',
    'restart',
    'keg-regulator'
  ])

  await runCmd('yarn', [ 'docker:cli' ])

})()
