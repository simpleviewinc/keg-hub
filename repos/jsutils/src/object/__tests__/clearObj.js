const Obj = require('../')

describe('clearObj', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should remove all props from an object', () => {
    const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
    Obj.clearObj(obj)

    expect('test' in obj).toEqual(false)
    expect('sub' in obj).toEqual(false)
  })

  it('should not remove filtered props', () => {
    const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
    Obj.clearObj(obj, [ 'sub' ])

    expect('test' in obj).toEqual(false)
    expect('sub' in obj).toEqual(true)
  })

})
