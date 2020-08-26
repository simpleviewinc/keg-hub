
/**
 * Default properties used when defining a property on an object
 * @object
 */
const defOpts = {
  enumerable: true,
  configurable: false,
}

/**
 * Defines a property on the passed in parent object
 * Merges the passed in options with the default options
 * @function
 * @param {Object} parent - Parent object to add the property key to
 * @param {string} key - Name of the property to add
 * @param {Object} opts - Options used to define the property
 *
 * @returns {Voids}
 */
const defineProperty = (parent, key, opts={}) => {
  Object.defineProperty(parent, key, {
    ...defOpts,
    ...opts
  })
}

module.exports = {
  defineProperty
}