const { writeFileSync } = require('KegFileSys/fileSys')

const writePackageVersion = (package, location, version) => {
  version && (package.version = version)
  return writeFileSync(
    `${location}/package.json`,
    JSON.stringify(package, null, 2) + '\n'
  )
}


module.exports = {
  writePackageVersion
}