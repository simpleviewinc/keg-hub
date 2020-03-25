const Str = require('../')

describe('parseJSON,', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should parse json string into an object', () => {
    const amString = JSON.stringify({ test: 'I am a string' })
    expect(typeof amString).toEqual('string')

    expect(typeof Str.parseJSON(amString)).toEqual('object')
  })

  it('should call console.error and not throw on invalid json', () => {
    const consoleErr = console.error
    console.error = jest.fn()
    const amString = JSON.stringify({ test: 'I am a string' }) + '#$^$#'
    const notObj = Str.parseJSON(amString)

    expect(console.error).toHaveBeenCalled()
    expect(notObj).toEqual(null)

    console.error = consoleErr

  })

})
