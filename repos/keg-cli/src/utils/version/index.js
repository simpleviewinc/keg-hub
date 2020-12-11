module.exports = {
  ...require('./getVersionUpdate'),
  ...require('./updateVersionInDependencies'),
  ...require('./validateVersion'),
  ...require('./writePackageVersion'),
  ...require('./isValidSemver'),
  ...require('./getValidSemver')
}