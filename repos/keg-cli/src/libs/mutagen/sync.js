const { mutagenCli } = require('./commands')
const { deepMerge, get } = require('@svkeg/jsutils')
const {
  buildIgnore,
  buildMountPath,
  buildMutagenArgs,
  cleanPath
} = require('./helpers')


class Sync {

  constructor(mutagen){
    this.mutagen = mutagen
  }

  /**
  * Gets a list of all the current mutagen syncs
  * <br/> Allows parsing the format into json
  * @member Sync
  * @function
  * @param {Object} args - determine how the command and output should be handled
  * @param {Array} args.opts - Extra options to pass to the mutagenCli command
  * @param {string} args.format - Output format type ( text || json )
  * @param {boolean} args.log - Should the command being run be logged
  *
  * @returns {*} - response local the mutagen CLI
  */
  list = async (args={}) => {
    const { opts=[] } = args

    return mutagenCli({
      ...args,
      isList: true,
      opts: [ `sync`, `list` ].concat(opts),
    })
  }

  /**
  * Creates a sync between the local machine an a docker container
  * <br/> First builds the args, then the full create string, then calls the mutagen CLI 
  * @member Sync
  * @function
  * @param {Object} args - Location on the local host to be synced
  * @param {Object} args.ignore - All paths that the sync should ignore
  * @param {string} local - Location on the local host to be synced
  * @param {string} remote - Location on the docker container to be synced
  * @param {string} container - The id of the container to sync with
  *
  * @returns {*} - response local the mutagen CLI
  */
  create = async (args) => {
    const { container, config, name, log } = args
    const argsStr = buildMutagenArgs(this.mutagen.config.get(config))
    const mountPath = buildMountPath(args)

    return mutagenCli({
      log,
      opts: `sync create --name=${ name } ${ argsStr } ${ mountPath }`,
    })

  }

  /**
  * Gets a list of all the current mutagen syncs
  * <br/> Allows parsing the format into json
  * @member Sync
  * @function
  * @param {Object} args - determine how find the sync item
  * @param {string} args.name - Name of the sync item to find
  * @param {Object} args.otherArgs - Arguments for the sync.list command
  *
  * @returns {*} - response local the mutagen CLI
  */
  get = async args => {
    const { name, ...otherArgs } = args
    const list = await this.list({ ...otherArgs, format: 'json' })

    return list.find(item => item.name === name)
  }

  /**
  * Checks if a sync exists based on the local and remote paths
  * <br/> If paths are not passed in, uses name
  * @member Sync
  * @function
  * @param {Object} args - determine how find the sync item
  * @param {string} args.name - Name of the sync item to find
  * @param {string} args.local - Local folder to be synced
  * @param {string} args.remote - Docker folder to be synced
  *
  * @returns {Object} - Found sync object
  */
  exists = async ({ container, local, name, remote }) => {
    const syncList = await this.list({ format: 'json' })
    const usePaths = Boolean(container && local && remote)

    return syncList.find(sync => {

      return !usePaths
        ? sync.name === name
        : cleanPath(get(sync, 'alpha.url', '')) === cleanPath(local) &&
          cleanPath(get(sync, 'beta.url', '').split(container)[1]) === cleanPath(remote)
    })

  }

  /**
  * Terminates a sync by name
  * @member Sync
  * @function
  * @param {Object} args - determine how find the sync item
  * @param {string} args.name - Name of the sync item to terminate
  * @param {string} args.log - Log the mutagen command 
  *
  * @returns {string} - Response from the mutagenCLI
  */
  terminate = async ({ name, log }) => {
    return mutagenCli({
      log,
      opts: `sync terminate ${ name }`,
    })
  }

}

module.exports = {
  Sync
}