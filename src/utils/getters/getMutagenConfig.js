const path = require('path')
const { DOCKER } = require('KegConst/docker')
const { yml } = require('KegFileSys/yml')
const { tryCatch } = require('../helpers')
const { get, deepMerge, isStr, styleCase, checkCall } = require('@ltipton/jsutils')
const { CONTAINERS_PATH, MUTAGEN_MAP } = DOCKER

/**
 * Parses the passed in options and converts them into an object format mutagen lib can handle
 * @param {String} options - Stringified version of mutagen sync options
 *
 * @returns {Object} - Parsed mutagen options object
 */
const parseOptions = (options={}) => {
  if(!options || !isStr(options)) return options
  
  return options.split(' ')
    .reduce((parsed, option) => {
      option.indexOf(`--ignore=`) === 0
        ? checkCall(() => {
            const ignorePath = option.split('ignore=').pop()
            ignorePath.length && parsed.ignore.paths.push(ignorePath)

          })
        : checkCall(() => {
            let [ key, value ] = option.split('=')
            key = key.indexOf('--') === 0 && key.substring(2) || key
            key && value && (parsed[styleCase(key)] = value)
          })

      return parsed
    }, { ignore: { paths: [] }})

}

/**
 * Loads the mutagen config for the passed in content
 * <br/> Wrapped in a tryCatch that returns an empty object when error is thrown
 * @param {Object} context - Parent folder name of the mutagen config file
 *
 * @returns {Object} - Loaded mutagen config file
 */
const getMutagenConfig = (params) => tryCatch(async () => {
  const { context, service, overrides={}, options, __injected } = params

  const ymlConfig = __injected && __injected.mutagenPath || await yml.load(
    path.join(CONTAINERS_PATH, context, 'mutagen.yml')
  )

  const config = get(ymlConfig, `sync.${ service }`, {})

  const mappedConf = Object.keys(config)
    .reduce((conf, key) => {
      conf[ MUTAGEN_MAP[key] || key ] = config[ key ]
      return conf
    }, {})

  return deepMerge(mappedConf, overrides, parseOptions(options))

}, () => (overrides))



module.exports = {
  getMutagenConfig
}