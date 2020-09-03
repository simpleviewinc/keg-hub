const { deepFreeze, keyMap } = require('@keg-hub/jsutils') 

module.exports = deepFreeze({
  PACKAGE_TYPES: keyMap([
    'DOCKER',
    'NPM',
    'DEBIAN',
    'RUBYGEMS',
    'NUGET',
    'PYTHON',
    'MAVEN'
  ], true)
})
