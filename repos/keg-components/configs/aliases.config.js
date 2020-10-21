const pathAlias = require('./aliases.json')

const getAliases = (ext) => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, ext)

    return updated
  }, {})

module.exports.getAliases = getAliases