const { deepFreeze } = require('@keg-hub/jsutils')

const tagMap = deepFreeze({
  branch: {
    combine: [
      'commit',
      'package',
      'version'
    ],
    alias: [
      'b',
      'br',
      'branch',
    ],
  },
  commit: {
    combine: [
      'package',
      'version'
    ],
    alias: [
      'c',
      'cm',
      'commit',
    ],
  },
  env: {
    combine: [
      'branch',
      'commit',
      'package',
      'version'
    ],
    alias: [ 'env' ]
  },
  package: {
    combine: [],
    alias: [
      'p',
      'pkg',
      'package',
    ]
  },
  version: {
    combine: [],
    alias: [
      'v',
      'vr',
      'version',
    ]
  }
})

module.exports = {
  tagMap
}