const { get, isCol, isObj, isStr } = require('jsutils')
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
      return isStr(data)
        ? colors[logColor](data)
        : isFunc(data.toString)
          ? colors[logColor](data.toString())
          : colors[logColor](JSON.stringify(data, null, 2))
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
    }

    this.default = get(props, 'default', 'log')
    
    // Loop the colorMap and build the log method for it
    Object.keys(this.colorMap).map(key => this[key] = logData(this, key))

  }

  // Helper to change the default colors
  setColors(colorMap){
    isObj(colorMap) && (this.colorMap = { ...this.colorMap, ...colorMap })
  }

  emptyLine = () => console.log('')

}

// Create a Log instance, so we have a singleton through out the application
const Logger = new Log()

module.exports = {
  Logger
}