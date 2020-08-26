const path = require('path')
const { Logger } = require('KegLog')
const { requireFile } = require('KegFileSys')
const { get, mapObj, wordCaps, checkCall, isObj } = require('@svkeg/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

const pkgVals = [
  'version',
  'description',
  'author',
  'repository',
]

const printDetail = (key, value) => {
  value = (key === 'repository' && isObj(value) && value.url) || value

  Logger.pair(`    * ${ wordCaps(key) }:`, `${ value }`)
}

const getTapInfo = tapPath => {
  const { data } = requireFile(tapPath, 'package.json')
  

  if(!data) return

  data &&
    data.name && 
    checkCall(() => {
      const cleanedName = data.name.includes('/')
        ? data.name.split('/').slice(1).join(' ')
        : data.name

      Logger.yellow(`  ${ wordCaps(cleanedName) }`)
    })

  data && mapObj(data, (key, value) => pkgVals.includes(key) && printDetail(key, value))

}

/**
 * Lists all the linked taps
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const listTaps = args => {
  const { globalConfig } = args

  Logger.subHeader(`Linked Taps`)

  mapObj(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.TAP_LINKS }`, {}), (alias, path) => {
    getTapInfo(path)
    printDetail('Alias', alias)
    printDetail('Location', path)

    Logger.empty()
  })

  Logger.empty()

}

module.exports = {
  list: {
    name: 'list',
    alias: [ 'ls' ],
    action: listTaps,
    description: `Lists all linked taps`,
    example: 'keg tap list',
  }
}