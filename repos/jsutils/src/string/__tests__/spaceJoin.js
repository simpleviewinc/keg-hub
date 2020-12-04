const { spaceJoin } = require('../')

const defStr = 'keg-default-class'
const spacedStr = 'keg-default-class keg-passed-down'
const strArr = [ 'keg-default-class', 'keg-passed-down' ]
const customStr = 'custom-keg-class'

describe('spaceJoin', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should join two strings with spaces', () => {
    expect(spaceJoin('', defStr)).toBe(defStr)
    expect(spaceJoin(customStr, defStr)).toBe(`custom-keg-class ${defStr}`)
    expect(spaceJoin(customStr, spacedStr)).toBe(`custom-keg-class ${spacedStr}`)
  })

  it('should join a string and array of strings with spaces', () => {
    expect(spaceJoin(customStr, strArr)).toBe(`custom-keg-class ${strArr.join(' ')}`)
  })

  it('should handle non-strings in the first param gracefully', () => {
    expect(spaceJoin(0, defStr)).toBe(defStr)
    expect(spaceJoin([], defStr)).toBe(defStr)
    expect(spaceJoin({}, defStr)).toBe(defStr)
    expect(spaceJoin(true, defStr)).toBe(defStr)
    expect(spaceJoin(false, defStr)).toBe(defStr)
    expect(spaceJoin(undefined, defStr)).toBe(defStr)
    expect(spaceJoin(null, defStr)).toBe(defStr)
  })

  it('should handle non-strings and non-arrays in the second param gracefully', () => {
    expect(spaceJoin(defStr, 0)).toBe(defStr)
    expect(spaceJoin(defStr, [])).toBe(defStr)
    expect(spaceJoin(defStr, {})).toBe(defStr)
    expect(spaceJoin(defStr, true)).toBe(defStr)
    expect(spaceJoin(defStr, false)).toBe(defStr)
    expect(spaceJoin(defStr, undefined)).toBe(defStr)
    expect(spaceJoin(defStr, null)).toBe(defStr)
  })

  it('should handle non-strings and non-arrays in the either param gracefully', () => {
    expect(spaceJoin(0, 0)).toBe('')
    expect(spaceJoin([], [])).toBe('')
    expect(spaceJoin({}, {})).toBe('')
    expect(spaceJoin(true, true)).toBe('')
    expect(spaceJoin(false, false)).toBe('')
    expect(spaceJoin(undefined, undefined)).toBe('')
    expect(spaceJoin(null, null)).toBe('')
  })

})