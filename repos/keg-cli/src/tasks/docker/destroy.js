const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { executeCmd } = require('KegProc')
const { DOCKER } = require('KegConst/docker')
const { isStr, get, plural, uniqArr } = require('@keg-hub/jsutils')
const { generalError } = require('KegUtils/error/generalError')
const { confirmExec } = require('KegUtils/helpers/confirmExec')
const { getSetting } = require('KegUtils/globalConfig/getSetting')

/**
 * Removes all of a docker type base on the passed in args
 * @function
 * @param {Object} items - Items to check for match
 * @param {string} type - Docker item type
 * @param {Array} refs - Refs to the docker items to validate matches
 *
 * @returns {Array} - Docker items matching the type and passed in references
 */
const getMatchingRefs = (items, type, refs) => {
  const toCheck = [ 'id', 'name', 'repository' ]

  const matching = items.reduce((removeItems, item) => {
    toCheck.map(check => {
      const removeRef = item.id || item.name || item[ check ]
      refs.includes(item[ check ]) &&
        !removeItems.includes(removeRef) &&
        removeItems.push(removeRef)
        
    })

    return removeItems
  }, [])

  return uniqArr(matching).join(' ')
}

/**
 * Removes all of a docker type base on the passed in args
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerDestroy = async args => {
  const { params } = args
  const { reference, type } = params
  const refs = reference && reference.split(',')

  let toRemove
  let removeType

  switch(type.toLowerCase()){
    case 'c':
    case 'cont':
    case 'container':
    case 'containers': {
      const containers = await docker.container.list()
      removeType = 'container'
      toRemove = getMatchingRefs(containers, removeType, refs)

      break
    }
    case 'i':
    case 'img':
    case 'image':
    case 'images': {
      const images = await docker.image.list()
      removeType = 'image'
      toRemove = getMatchingRefs(images, removeType, refs)
      
      break
    }
    case 'v':
    case 'vol':
    case 'volume':
    case 'volumes': {
      const volumes = await docker.volume.list()
      removeType = 'volume'
      toRemove = getMatchingRefs(volumes, removeType, refs)

      break
    }
  }

  const pluralRemove = plural(removeType)

  !toRemove
    ? Logger.error(`Could not find any ${ type } matching ${ toRemove }!`)
    : confirmExec({
        confirm: `Remove all ${ pluralRemove }?`,
        success: `Removed all ${ pluralRemove }!`,
        cancel: `Remove all ${ pluralRemove } cancelled!`,
        preConfirm: getSetting(`docker.preConfirm`),
        execute: async () => {

          // Containers must be stopped before they can be removed!
          const contRes = removeType === 'container'
            ? await checkCall(() => {
                reference
                  ? Logger.highlight(`Stopping ${ pluralRemove } by references`, `"${ reference }"`)
                  : Logger.highlight(`Stopping all`, `"${ pluralRemove }"`)

                return executeCmd(`docker stop ${ toRemove } --force`)
              })
            : {}

          // Just log the error, because we don't want to throw
          // Stopping containers might error on a single container
          // But we can still call remove to remove other containers
          contRes.error && Logger.error(error)

          reference
            ? Logger.highlight(`Destroying ${ pluralRemove } by references`, `"${ reference }"`)
            : Logger.highlight(`Destroying all`, `"${ pluralRemove }"`)

          const { error, data } = await executeCmd(
            `docker ${ removeType } rm ${ toRemove } --force`
          )
          error && generalError(error)

        },
      })


}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'des', 'kill' ],
    action: dockerDestroy,
    description: 'Destroy docker items of the passed in type',
    example: 'keg docker destroy <options>',
    options: {
      type: {
        allowed: [ 'containers', 'container', 'cont', 'c', 'images', 'image', 'img', 'i', 'volumes', 'volume', 'vol', 'v' ],
        description: 'Type of docker item to destroy',
        example: 'keg docker destroy --type containers',
        ask: {
          type: 'list',
          default: 'N/A',
          message: 'Please select a type...',
          choices: [
            'Containers',
            'Images',
            'Volumes',
          ]
        },
      },
      reference: {
        alias: [ 'refs', 'ref' ],
        description: 'Comma separated list of names or ids referencing the items to be removed. ( Defaults to all of type )',
        example: 'keg docker destroy --type containers --reference my-container,other-container',
      }
    }
  }
}