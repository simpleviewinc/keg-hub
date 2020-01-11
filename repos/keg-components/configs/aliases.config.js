const pathAlias = require('./aliases.json')

const getAliases = platform => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, platform)

    return updated
  }, {})

module.exports.getAliases = getAliases
module.exports.aliases = process.env.RE_PLATFORM && getAliases(process.env.RE_PLATFORM) || {}
