const Obj = require('../')

describe('keyMap', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return object with keys and values equal to values in array', () => {
    const arr = [ 'test', 'foo', 'bar', 'data', 'sub' ]
    const mapped = Obj.keyMap(arr)

    Obj.reduceObj(mapped, (key, value) => {
      expect(key).toEqual(value)
      expect(arr.indexOf(key)).not.toEqual(-1)
      expect(arr.indexOf(value)).not.toEqual(-1)
    })
  })

  it('should convert key and value to uppercase if second param is true', () => {
    const arr = [ 'test', 'foo', 'bar', 'data', 'sub' ]
    const mapped = Obj.keyMap(arr, true)

    arr.map(key => {
      expect(key.toUpperCase() in mapped).toEqual(true)
      expect(mapped[key.toUpperCase()]).toEqual(key.toUpperCase())
    })
  })

})
