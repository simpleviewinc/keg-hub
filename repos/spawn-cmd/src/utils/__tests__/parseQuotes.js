const { isArr } = require('@keg-hub/jsutils')
const { parseQuotes } = require('../parseQuotes')


describe('/parseQuotes', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return quoted arguments as a single argument', () => {
    const resp = parseQuotes([ 'echo', '"I', 'am', 'one"' ])
    expect(resp).toEqual([ 'echo', 'I am one' ])
  })

  it('should work when multiple array items have multiple quoted arguments', () => {
    const resp = parseQuotes([ 'echo', '"I', 'am', 'one"', '"I', 'am', 'also', 'one"' ])
    expect(resp).toEqual([ 'echo', 'I am one', 'I am also one' ])
  })

  it('should work when an array items has escaped quotes', () => {
    const resp = parseQuotes([ 'echo', '\'I', 'am', 'one\'', , "\"I", "am", "also", "one\"" ])
    expect(resp).toEqual([ 'echo', 'I am one', 'I am also one' ])
  })

  it('should when no array items have quotes', () => {
    const resp = parseQuotes([ 'echo', 'I', 'am', 'not', 'one' ])
    expect(resp).toEqual([ 'echo', 'I', 'am', 'not', 'one' ])
  })

  it('should handel non-array arguments gracefully', () => {
    const objRes = parseQuotes({})
    expect(isArr(objRes)).toBe(true)
    expect(objRes.length).toBe(0)

    const boolRes = parseQuotes(false)
    expect(isArr(boolRes)).toBe(true)
    expect(boolRes.length).toBe(0)
    
    const emptyRes = parseQuotes()
    expect(isArr(emptyRes)).toBe(true)
    expect(emptyRes.length).toBe(0)
  })

})
