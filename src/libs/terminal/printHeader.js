const colors = require('colors/safe')

/**
 * Helper to log out CLI message header
 * @param {string} title
 *
 * @returns {void}
 */
const printHeader = title => {
  const middle = `              ${title}              `

  const line = middle.split('').reduce((line, item, index) => {
    line+=' '

    return line
  })

  console.log(``)
  console.log(colors.underline.brightGreen(line))
  console.log(line)
  console.log(colors.brightGreen(middle))
  console.log(colors.underline.brightGreen(line))
  console.log(``)
}

module.exports = {
  printHeader
}