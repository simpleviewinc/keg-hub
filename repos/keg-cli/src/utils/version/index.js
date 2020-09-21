module.exports = {
  ...require('./getUpdateVersion'),
  ...require('./updateVersionInDependencies'),
  ...require('./validateVersion'),
  ...require('./writePackageVersion'),
}