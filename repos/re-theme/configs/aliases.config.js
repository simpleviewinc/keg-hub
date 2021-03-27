const pathAlias = {
  RePlatform: 'src/context/platform${platform}',
  ReDimensions: 'src/dimensions/dimensions${platform}',
  StyleInjector: 'src/styleInjector/index${platform}',
}

const getAliases = (ext) => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, ext)

    return updated
  }, {})

module.exports = {
  getAliases
}