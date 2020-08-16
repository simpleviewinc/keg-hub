const ask = jest.fn(() => { return { tap: 'test-tap' } })
ask.promptList = jest.fn(() => { return 1 })
ask.input = jest.fn(() => { return 'test-value' })
const buildModel = jest.fn((type, model) => { return model })

module.exports = {
  ask,
  buildModel
}