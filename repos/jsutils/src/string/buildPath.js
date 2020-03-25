/** @module string */

/**
 * Builds a string path from passed in args ( i.e. path/to/thing ).
 * @function
 * @return {string} - built path from arguments
 */
export const buildPath = (...args) => {
  const built = args.reduce((path, arg) => {
    let str = toStr(arg)

    return `${path}${ str && '/' + str || '' }`
  }, '')
  
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/')
}
