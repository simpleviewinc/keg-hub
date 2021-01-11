const { get, isStr, isFunc} = require('@keg-hub/jsutils')
const { aliasToTag } = require('../../getters/getTagVarMap')
const { getPassedOptionTag, getPackageVersionTag, getRepoGitTag } = require('KegUtils/docker/tags/tagHelpers')

/**
 * Map of methods that are called based on the key name
 * Allows building dynamic tags based on custom / context values
 * @type Object
 */
const mapMethods = {
  branch: getRepoGitTag,
  commit: getRepoGitTag,
  package: getPackageVersionTag,
  version: getPassedOptionTag,
  env: getPassedOptionTag,
}

/**
 * Converts the passed in vars array real values to create dynamic tags
 * @type function
 * @param {Array} vars - Custom placeholder strings for building dynamic tags
 * @param {Object} methodArgs - Dynamic arguments to pass to the matching vars method to allow building the var value
 *
 * @returns {Promise[Array]} - Array of promises resolving to dynamic tag values built from the vars array
 */
const getVariableValue = (vars, methodArgs) => {
  return vars.reduce(async (toResolve, placeholder) => {
    const tag = await toResolve
    const method = aliasToTag[placeholder]
    const tagValue = isFunc(mapMethods[method]) && await mapMethods[method](methodArgs, method)
    return tagValue
      ? tag
        ? `${tag}-${tagValue}`
        : tagValue
      : tag

  }, Promise.resolve(''))
}

/**
 * Converts the passed in variable real values to create tags with
 * @type function
 * @param {Array} variable - Custom placeholder strings for building dynamic tags
 * @param {Object} args - Arguments passed to the task
 *
 * @returns {Array} - Array of dynamic tag values built from the variable array
 */
const tagFromVariables = async (variable, version, env, args) => {
  const { containerContext, task } = args
  const varOptions = get(task, 'options.tagVariable.allowed', [])
  const methodArgs = { ...args, params: { ...args.params, version, env }}

  const builtTags = variable.reduce((tags, replace) => {
    if(!varOptions.includes(replace)) return tags

    const vars = replace.includes(':')
      ? replace.split(':')
      : [replace]

    tags.push(getVariableValue(vars, methodArgs))

    return tags
  }, [])

  const tags = await Promise.all(builtTags)

  return tags.reduce((built, tag) => {
    const cleanedTag = tag && isStr(tag) && tag.trim()
    cleanedTag && built.push(cleanedTag)

    return built
  }, [])
}


module.exports = {
  tagFromVariables
}