
const { optionsHasArg } = require('../optionsHasArg')

describe('optionsHasArg', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return the option when options array has the passed in arg', () => {

    expect(optionsHasArg([ '--image', 'test' ], 'image')).toBe(true)
    expect(optionsHasArg([ 'image=test', '-t', 'foo' ], 'image')).toBe(true)

  })

  it('should return false when options array does not have the arg', () => {

    expect(optionsHasArg([ '--foo', 'test', 'bar=baz' ], 'image')).toBe(false)
    expect(optionsHasArg([ 'foo=test', '-t', 'foo' ], 'image')).toBe(false)

  })

})