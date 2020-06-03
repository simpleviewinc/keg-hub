const { keyMap } = require('jsutils')

const Logger = {
  color: jest.fn((colorName, data) => data),
  print: jest.fn((...data) => console.log(...data)),
  setColors: jest.fn(),
  header: jest.fn(),
  empty: jest.fn(() => console.log('')),
  message: jest.fn(),
  spacedMsg: jest.fn(),
}
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