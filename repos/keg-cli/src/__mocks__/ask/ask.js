const AskIt = jest.fn(() => {})
AskIt.promptList = jest.fn(() => { return 1 })

module.exports = {
  AskIt
}