const Obj = require('../')

describe('isObj', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should test if data is an object', () => {
    const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
    expect(Obj.isObj(obj)).toEqual(true)
  })

  it('should return false if data is an array', () => {
    const obj = [ 1, 2, 3 ]
    expect(Obj.isObj(obj)).toEqual(false)
  })

})