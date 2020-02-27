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
  console.log(line.underline.brightGreen)
  console.log(line)
  console.log(middle.brightGreen)
  console.log(line.underline.brightGreen)
  console.log(``)
}

module.exports = {
  printHeader
}