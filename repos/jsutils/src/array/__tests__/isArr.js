const Arr = require('../')

describe('isArr', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check for arrays', () => {
    expect(Arr.isArr([1,2])).toBe(true)
    expect(Arr.isArr([])).toBe(true)
    expect(Arr.isArr({})).toBe(false)
    expect(Arr.isArr("hi")).toBe(false)
    expect(Arr.isArr(1)).toBe(false)
    expect(Arr.isArr(null)).toBe(false)
    expect(Arr.isArr(new Set())).toBe(false)
  })

})
