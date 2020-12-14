const { parseQuotes } = require('../parseQuotes')


describe('/parseQuotes', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return quoted arguments as a single argument', () => {
    const resp = parseQuotes([ 'echo', '"I', 'am', 'one"' ])
    expect(resp).toEqual([ 'echo', 'I am one' ])
  })

  it('should work with multiple quoted arguments', () => {
    const resp = parseQuotes([ 'echo', '"I', 'am', 'one"', '"I', 'am', 'also', 'one"' ])
    expect(resp).toEqual([ 'echo', 'I am one', 'I am also one' ])
  })

  it('should work with escaped quotes', () => {
    const resp = parseQuotes([ 'echo', '\'I', 'am', 'one\'', , "\"I", "am", "also", "one\"" ])
    expect(resp).toEqual([ 'echo', 'I am one', 'I am also one' ])
  })

})
