import { isNum, isObj } from '@svkeg/jsutils'
import cssProperties from './cssProperties'

/**
 * Converts JS CSS rule into CSS string
 * @param  { object } rule - style as JS CSS
 * @return { string } rule convert into CSS string
 */
const createRules = rule => (
  Object
    .entries(rule)
    .reduce((ruleString, [ propName, propValue ]) => {
      const name = propName
        .replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`)

      const hasUnits = !cssProperties.noUnits[propName]
      const val = hasUnits && isNum(propValue) && propValue + 'px' || propValue

      return `${ruleString}\n\t${name}: ${val};`
    }, '')
)

/**
 * Converts a block of JS CSS into CSS string
 * @param  { string } selector - CSS selector for the rules
 * @param  { object } rls - CSS rules to be converted into a string
 * @return
 */
const createBlock = (selector, rls) => {
  const subSelect = []

  const filteredRls = Object.keys(rls)
    .reduce((filtered, key) => {

      !isObj(rls[key])
        ? (filtered[key] = rls[key])
        : (subSelect.push([ `${selector} ${key}`, rls[key] ]))

      return filtered
    }, {})

  const styRls = createRules(filteredRls)
  let block = `${selector} {${styRls}\n}\n`

  subSelect.length &&
    subSelect.map(subItem => block += createBlock(subItem[0], subItem[1]))

  return block
}

  /**
  * Converts the JS styles into a css string
  * @param  { array of objects } rules - array of object styles to add convert into string
  * @return { string } styles objects converted into string as formatted css styles
  */
export const jsToCss = rules => {
  return Object
    .entries(rules)
    .reduce((styles, [ selector, rls ]) => (styles + createBlock(selector, rls)), '')
}
