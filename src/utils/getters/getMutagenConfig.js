const path = require('path')
const { DOCKER } = require('KegConst/docker')
const { yml } = require('KegFileSys/yml')
const { tryCatch } = require('../helpers')
const { get, deepMerge } = require('jsutils')
const { CONTAINERS_PATH, MUTAGEN_MAP } = DOCKER

/**
 * Loads the mutagen config for the passed in content
 * <br/> Wrapped in a tryCatch that returns an empty object when error is thrown
 * @param {Object} context - Parent folder name of the mutagen config file
 *
 * @returns {Object} - Loaded mutagen config file
 */
const getMutagenConfig = (context, service, overrides={}) => tryCatch(async () => {
  const ymlConfig = await yml.load(path.join(CONTAINERS_PATH, context, 'mutagen.yml'))

  const config = get(ymlConfig, `sync.${ service }`, {})

  const mappedConf = Object.keys(config)
    .reduce((conf, key) => {
      conf[ MUTAGEN_MAP[key] || key ] = config[ key ]
      return conf
    }, {})

  return deepMerge(mappedConf, overrides)

}, () => (overrides))



module.exports = {
  getMutagenConfig
}