const { generalError } = require('KegMocks/utils/error/generalError')
const { Logger } = require('KegMocks/logger')

jest.setMock('KegLog', { Logger })
jest.setMock('KegUtils/error', { generalError })

const { isValidSemver } = require('../isValidSemver')
describe('isValidSemver', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return TRUE on minor/major/patch input', () => {
    expect(isValidSemver('minor')).toBe(true)
    expect(isValidSemver('major')).toBe(true)
    expect(isValidSemver('patch')).toBe(true)
  })

  it('should return TRUE on semver version number as input', () => {
    expect(isValidSemver('1.0.0')).toBe(true)
    expect(isValidSemver('10.1.0')).toBe(true)
    expect(isValidSemver('2.2.2')).toBe(true)
  })

  it('should throw on invalid versions', () => {
    expect(isValidSemver('1.foo.0')).toBe(false)
    expect(isValidSemver('x.1.5')).toBe(false)
    expect(isValidSemver('test')).toBe(false)
  })

  it('should throw on non strings', () => {
    expect(isValidSemver(123.4)).toBe(false)
    expect(isValidSemver({})).toBe(false)
    expect(isValidSemver([])).toBe(false)
    expect(isValidSemver(true)).toBe(false)
  })

})