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

  it('should handle non-strings gracefully', () => {
    expect(spaceJoin(0, defStr)).toBe(defStr)
    expect(spaceJoin([], defStr)).toBe(defStr)
    expect(spaceJoin({}, defStr)).toBe(defStr)
    expect(spaceJoin(true, defStr)).toBe(defStr)
    expect(spaceJoin(false, defStr)).toBe(defStr)
    expect(spaceJoin(undefined, defStr)).toBe(defStr)
    expect(spaceJoin(null, defStr)).toBe(defStr)
  })

})