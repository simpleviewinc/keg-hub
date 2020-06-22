const { deepFreeze, deepMerge } = require('jsutils')
const { images } = require('./values')

// TODO: some of these values are duplicated in containers.js
// Need to clean this up at some point
const DEFAULT = {
  VALUES: {
    port: '-p 80:19006 -p 19002:19002',
    clean: '--rm',
    attached: '-it',
    detached: '-d',
  },
  DEFAULTS: {
    port: true,
    attached: true,
    clean: true,
    network: true,
  }
}

module.exports = deepFreeze({
  RUN: images.reduce((data, image) => {
    data[image.toUpperCase()] = deepMerge(DEFAULT, {})

    return data
  }, {})
})