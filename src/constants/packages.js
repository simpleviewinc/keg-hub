const { keyMap } = require('jsutils') 

module.exports = {
  PACKAGE_TYPES: keyMap([
    'DOCKER',
    'NPM',
    'DEBIAN',
    'RUBYGEMS',
    'NUGET',
    'PYTHON',
    'MAVEN'
  ], true)
}
