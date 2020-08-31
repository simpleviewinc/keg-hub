#!/usr/bin/env node

const { compose } = require("./docker")


;( async () => {

  await compose([
    '-f',
    'container/docker-compose.yml',
    '-f',
    'container/docker-compose.headless.yml',
    'down',
     '-v'
  ])

})()
