const { keyMap } = require('@keg-hub/jsutils')

const logData = (...data) => console.log(...data)

const Logger = {
  color: jest.fn((colorName, data) => data),
  print: jest.fn(logData),
  setColors: jest.fn(),
  header: jest.fn(logData),
  highlight: jest.fn(logData),
  empty: jest.fn(() => console.log('')),
  label: jest.fn(logData),
  message: jest.fn(logData),
  pair: jest.fn(logData),
  spacedMsg: jest.fn(logData),
  stderr: jest.fn((...data) => console.error(...data)),
  stdout: jest.fn(logData),
  table: jest.fn(logData),
}

Logger.spaceMsg = Logger.spacedMsg
Logger.log = Logger.print

const colorMap = [
  'data',
  'dir',
  'error',
  'fail',
  'info',
  'log',
  'success',
  'text',
  'warn',
  'green',
  'red',
  'yellow',
  'cyan',
  'magenta',
  'blue',
  'gray',
]

Logger.colorMap = keyMap(colorMap)
Logger.colors = {}
colorMap.map(item => {
  Logger[item] = jest.fn()
  Logger.colors[item] = jest.fn()
})

module.exports = {
  Logger
}