const Obj = require('../')

describe('filterObj', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should work across an object\'s entries', () => {
    const foo = { a: 1, b: 2, c: 3 }

    let result = Obj.filterObj(foo, (k, v) => v > 2)
    expect(result.a).toBe(undefined)
    expect(result.b).toBe(undefined)
    expect(result.c).toBe(foo.c)
  })

  it('should log errors and return the obj argument if invalid input was passed', () => {
    const orgError = console.error
    const outputArr = []
    console.error = (output) => outputArr.push(output)

    const aString = "not an object"
    expect(Obj.filterObj(aString, () => {})).toEqual(aString)
    expect(Obj.filterObj({}, null)).toEqual({})
    expect(outputArr.length).toEqual(2)
    console.error = orgError
  })
})