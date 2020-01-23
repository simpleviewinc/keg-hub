const path = require('path')
const extraNodeModules = {}
const blacklistRegexes = []
const watchFolders = []
const metroVersion = require('metro/package.json').version
const metroVerComps = metroVersion.match(/^(\d+)\.(\d+)\.(\d+)/)

module.exports = metroVerComps[1] === '0' && parseInt(metroVerComps[2], 10) >= 43
  ? {
    resolver: {
      extraNodeModules,
      blacklistRE: require('metro-config/src/defaults/blacklist')(
        blacklistRegexes
      )
    },
    watchFolders
  }
  : {
    extraNodeModules,
    getBlacklistRE: () => require('metro/src/blacklist')(blacklistRegexes),
    getProjectRoots: () => [ path.resolve(__dirname) ].concat(watchFolders)
  }
