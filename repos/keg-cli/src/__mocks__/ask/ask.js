global.test = global.test || {}
global.test.askit = global.test.askit || {}
global.test.askit.input = global.test.askit.input || 'test input'
global.test.askit.promptList = global.test.askit.promptList || 1

const AskIt = jest.fn(() => {})
AskIt.promptList = jest.fn(() => { return global.test.askit.promptList })
AskIt.input = jest.fn(() => { return global.test.askit.input })

module.exports = {
  AskIt
}