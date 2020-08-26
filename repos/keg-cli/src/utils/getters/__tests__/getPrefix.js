const { getPrefix } = require('../getPrefix')

describe('getPrefix', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return the passed in argument if it has a container prefix', () => {

    const imgPrefix = getPrefix('img-test-foo')
    expect(imgPrefix).toBe('img-test-foo')

    const packagePrefix = getPrefix('package-test-foo')
    expect(packagePrefix).toBe('package-test-foo')

  })

  it('should return false if the passed in argument does not have a prefix', () => {
    expect(getPrefix('test-foo')).toBe(false)
  })

  it('should return false if a string is not passed', () => {

    expect(getPrefix({})).toBe(false)
    expect(getPrefix([])).toBe(false)
    expect(getPrefix(null)).toBe(false)
    expect(getPrefix(true)).toBe(false)
    expect(getPrefix(100)).toBe(false)

  })


})
