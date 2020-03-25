const Str = require('../')

describe('capitalize', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should capitalize the first letter of a string', () => {
    const dirty = 'first letter Capitalize'
    const clean = 'First letter capitalize'
    const cleaned = Str.capitalize(dirty)

    expect(cleaned).toEqual(clean)

  })

  it('should lowerCase other characters', () => {
    const dirty = 'first letter capitalize'
    const cleaned = Str.capitalize(dirty)

    expect(cleaned.indexOf('Capitalize')).toEqual(-1)
  })

  it('should return passed in data when data is not a string', () => {
    const dirty = {}
    const cleaned = Str.capitalize(dirty)

    expect(cleaned).toEqual(dirty)

  })

})
