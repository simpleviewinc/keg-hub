const pathAlias = {
  ReDimensions: 'src/dimensions/dimensions.${platform}'
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