const Obj = require('../')

describe('someEntry', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should work across an object\'s entries', () => {
    const foo = { a: 1, b: 2, c: 3}

    let result = Obj.someEntry(foo, (k,v) => (v > 2))
    expect(result).toBe(true)

    result = Obj.someEntry(foo, (k,v) => (v > 4))
    expect(result).toBe(false)
  })

  it('should log errors and return false if invalid input was passed', () => {
    const orgError = console.error
    const outputArr = []
    console.error = (output) => outputArr.push(output)

    const aString = "neither a function nor object"
    expect(Obj.someEntry(null, () => {})).toEqual(false)
    expect(Obj.someEntry({}, aString)).toEqual(false)
    expect(Obj.someEntry(aString, () => {})).toEqual(false)
    expect(outputArr.length).toEqual(3)

    console.error = orgError
  })
})

