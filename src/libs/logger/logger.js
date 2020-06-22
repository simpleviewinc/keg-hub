const { get, isColl, isObj, isStr, isFunc } = require('jsutils')
const colors = require('colors/safe')

/**
 * General logging method for all log types
 * @param {Loc Class} logger - Log class instance
 * @param {string} type - Type of log ( key of Log.colorMap )
 *
 * @returns {Void}
 */
const logData = (logger, type) => {

  return (...args) => {

    // Get the log color from the type, or use the default
    const logColor = logger.colorMap[type] || logger.colorMap[logger.default]

    // If the type is a log type use it, otherwise use the default
    const logMethod =  console[type] && type || logger.default

    // Loop the passed in data to log, and apply the log color
    const toLog = args.map(data => {
      return isColl(data)
        ? colors[logColor](JSON.stringify(data, null, 2))
        : isFunc(data.toString)
          ? colors[logColor](data.toString())
          : colors[logColor](data)
    })

    console[logMethod](...toLog)
  }

}

class Log {

  constructor(props){

    this.colorMap = {
      data: 'brightWhite',
      dir: 'brightWhite',
      error: 'brightRed',
      fail: 'brightRed',
      info: 'brightCyan',
      log: 'brightWhite',
      success: 'brightGreen',
      text: 'brightWhite',
      warn: 'brightYellow',
      green: 'brightGreen',
      red: 'brightRed',
      yellow: 'brightYellow',
      cyan: 'brightCyan',
      magenta: 'brightMagenta',
      blue: 'brightBlue',
      gray: 'gray'
    }

    this.default = get(props, 'default', 'log')
    
    // Loop the colorMap and build the log method for it
    Object.keys(this.colorMap).map(key => this[key] = logData(this, key))

    // Add the colors module for easy access
    this.colors = colors

  }

  /**
  * Helper create string in the passed in color
  * @function
  * @param {string} colorName - name of the color to use
  * @param {string} data - data to set color for
  *
  * @returns {void}
  */
  color = (colorName, data) => (colors[this.colorMap[colorName] || colorName](data))

  /**
  * Helper to print the passed in data
  * @function
  *
  * @returns {void}
  */
  print = (...data) => console.log(...data)

  /**
  * Helper to change the default colors
  * @function
  *
  * @returns {void}
  */
  setColors = colorMap => (
    isObj(colorMap) && (this.colorMap = { ...this.colorMap, ...colorMap })
  )

  /**
  * Helper to log an empty line
  * @function
  *
  * @returns {void}
  */
  empty = () => console.log('')

  /**
   * Helper to print out a table.
   * @see docs about params here: https://developer.mozilla.org/en-US/docs/Web/API/Console/table
   * @returns {void}
   */
  table = (...args) => console.table(...args)

  /**
  * Helper to log out CLI message header
  * @function
  *
  * @param {string} title
  *
  * @returns {void}
  */
  header = title => {
    const middle = `              ${title}              `

    const line = middle.split('')
      .reduce((line, item, index) => (line+=' '))

    this.empty(``)
    this.print(colors.underline.brightGreen(line))
    this.print(line)
    this.print(colors.brightGreen(middle))
    this.print(colors.underline.brightGreen(line))
    this.empty(``)
  }

  /**
  * Helper to log a title and message in separate colors
  * @function
  * @param {string} title - Prints the string in cyan
  * @param {string} message - Prints the string in white
  *
  * @returns {void}
  */
  pair = (title, message) => {
    const toLog = []
    // Check that the title and message exist, then add to the toLog array
    title && toLog.push(Logger.colors.brightCyan(title))
    message && toLog.push(Logger.colors.brightWhite(message))

    toLog.length && this.print(...toLog)
  }

  label = (...args) => this.pair(...args)

  /**
  * Helper to log a spaced title and message in separate colors
  * @function
  * @param {string} title - Prints the string in cyan
  * @param {string} message - Prints the string in white
  *
  * @returns {void}
  */
  spacedMsg = (title, message) => {
    this.empty()
    this.pair(title, message)
    this.empty()
  }

  /**
  * Same as spacedMsg
  */
  spaceMsg = (...args) => this.spacedMsg(...args)

  /**
  * Writes to the process stdout
  */
  stdout = (...args) => process.stdout.write(...args)
  /**

  * Writes to the process stderr
  */
  stderr = (...args) => process.stderr.write(...args)

}

/**
* Create a Log instance, so we have a singleton through out the application
*/
const Logger = new Log()

/**
* Helper to log the passed in data
*/
Logger.log = Logger.print

module.exports = {
  Logger
}