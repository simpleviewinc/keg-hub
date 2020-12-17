const { reduceObj } = require('@keg-hub/jsutils')
const { tagMap } = require('KegConst/tagMap')

const aliasToTag = {}
const allowedTagOpts = []

/**
 * Creates a map of alias matching the allowed options from the a task. Used in the tag-variable option
 * <br/>Also maps each alias to a key name, which is then used to call the correct method. Used in tagFromVariable helper
 * @type Object
 */
reduceObj(tagMap, (key, value, mapped) => {
  value.alias.map(alias => aliasToTag[alias] = key)

  allowedTagOpts.push(key)

  value.combine.map(otherTag => {
    if(!tagMap[otherTag] || !tagMap[otherTag].alias || !tagMap[otherTag].alias.length) return

    const otherAlias = tagMap[otherTag].alias
    value.alias.map(alias => {
      tagMap[otherTag].alias.map(otherAlias => allowedTagOpts.push(`${alias}:${otherAlias}`))
    })
  })

})


module.exports = {
  aliasToTag,
  allowedTagOpts
}