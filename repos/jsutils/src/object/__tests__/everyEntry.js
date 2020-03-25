const Obj = require('../')

describe('everyEntry', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should work across an object\'s entries', () => {

    const foo = { a: 1, b: 2, c: 3}

    let result = Obj.everyEntry(foo, (k,v) => (v > 2))
    expect(result).toBe(false)

    result = Obj.everyEntry(foo, (k,v) => (v > 0))
    expect(result).toBe(true)
  })

  it('should log errors and return false if invalid input was passed', () => {
    const orgError = console.error
    const outputArr = []
    console.error = (output) => outputArr.push(output)

    const aString = "neither a function nor object"
    expect(Obj.everyEntry(null, () => {})).toEqual(false)
    expect(Obj.everyEntry({}, aString)).toEqual(false)
    expect(Obj.everyEntry(aString, () => {})).toEqual(false) 
    expect(outputArr.length).toEqual(3)

    console.error = orgError
  })
})
