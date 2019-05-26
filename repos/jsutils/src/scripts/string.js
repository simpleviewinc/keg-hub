'use strict'

/**
 * Converts a string to camel case
 * @param  { string } string to be converted
 * @return { string } - string in camel case format
 */
const camelCase = (str, compCase) => {
  return (
    (str &&
      clean(str)
        .split(' ')
        .map(
          (word, index) =>
            ((index > 0 || compCase) && capitalize(word)) || word.toLowerCase()
        )
        .join('')) ||
    str
  )
}

/**
 * Converts `-` and `_` to white space and removes `.`
 * @param  { string } string to be converted
 * @return { string } - cleaned string
 */
const clean = str => {
  if (!str) return str
  return removeDot(str)
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
}

/**
 * Converts first letter of a string to be capitalized
 * @param  { string } string
 * @return { string } - Passed in string, but capitalized
 */
const capitalize = str => (
  isStr(str) && str[0] && `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}` || str
)

/**
 * Check if string is a email
 * @param  { string } string to check
 * @return { boolean } - if it's a email
 */
const isEmail = str => {
  if (!str || typeof str !== 'string') return false
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return Boolean(regex.test(str))
}

/**
 * Check if string is a phone number
 * @param  { string } string to check
 * @return { boolean } - if it's a phone number
 */
const isPhone = str => {
  if (!str || typeof str !== 'string') return false
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11
}

/**
 * Check if data is a string
 * @param  { all } str - param to check if type is a string 
 * @return { boolean } - if it's a string
 */
const isStr = str => typeof str === 'string'

/**
 * Check if string is a url
 * @param  { string } string to check
 * @return { boolean } - if it's a url
 */
const isUrl = str => {
  const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  return Boolean(regex.test(str))
}

/**
 * Check if string is a uuid
 * @param  { string } string to check
 * @return { boolean } - if it's a uuid
 */
const isUuid = str => {
  if (!str || typeof str !== 'string') return false
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  return Boolean(regex.test(str))
}


/**
 * Convert JSON string into object, wrapped in a try / catch
 * @param  { string } string
 * @return { object } - JSON object
 */
const parseJSON = str => {
  try {
    return JSON.parse(str)
  }
  catch (e){
    console.error(e.message)
    return null
  }
}

/**
 * Adds an `s` to the end of a string, if one does not exist
 * @param  { string } str - string to convert
 * @return { string } string as a plural
 */
const plural = str => {
  if (!str || !str.length) return str
  return str[str.length - 1] !== 's' ? str + 's' : str
}

/**
 * Removes a `.` from the start and end of a string
 * @param  { string } str - string to convert
 * @return { string } - string without the `.`
 */
const removeDot = string => {
  const noDot = string.indexOf('.') === 0 ? string.slice(1) : string
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot
}

/**
 * Sanitize a string of HTML content
 * @param  { string } string
 * @return { string } - cleaned string
 */
const sanitize = str => (
  isStr(str) && str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;') || str
)

/**
 * Remove an `s` at the end of a string, if the last char is an `s`
 * @param  { string } str - string to convert
 * @return { string } string as singular
 */
const singular = str => {
  if (!str || !str.length) return str
  return str[str.length - 1] === 's'
    ? str.slice(0, str.length - 1)
    : str
}

/**
 * Converts a string to css in js format
 * Useful for converting css rules into js format, I.E. margin-top => marginTop
 * @param  { string } str - string to be converted
 * @return { string } - string in style case format
 */
const styleCase = str => {
  str = str.split(/[\s,-]/)
  str = str.map(capitalize)
  str[0] = str[0].toLowerCase()
  return str.join('')
}

/**
 * Converts a string to train case
 * @param  { string } string to be converted
 * @return { string } - string in train case format
 */
const trainCase = str => isStr(str) && str.replace(/ /g, '-').toLowerCase() || str

/**
 * Converts all words in a string to be capitalized
 * @param  { string } string to be converted
 * @return { string } - string with all words capitalized
 */
const wordCaps = str => {
  if (!str) return str
  let cleaned = clean(str)
  return cleaned
    .split(' ')
    .map(word => {
      return capitalize(word)
    })
    .join(' ')
}

export {
  camelCase,
  clean,
  capitalize,
  isEmail,
  isPhone,
  isStr,
  isUrl,
  isUuid,
  plural,
  parseJSON,
  removeDot,
  sanitize,
  singular,
  styleCase,
  trainCase,
  wordCaps,
}
