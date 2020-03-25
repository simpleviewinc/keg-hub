const Obj = require('../')

describe('mapObj', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should call the callback on all object properties', () => {
    const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
    const keys = []
    const callBack = jest.fn((key, value) => keys.push(key))
    Obj.mapObj(obj, callBack)

    expect(keys.length).toEqual(3)
    expect(keys.indexOf('test')).not.toEqual(-1)
    expect(keys.indexOf('sub')).not.toEqual(-1)
    expect(keys.indexOf('data')).not.toEqual(-1)
    expect(callBack).toHaveBeenCalledTimes(3)
  })

  it('should return array of values retured from the callback', () => {
    const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
    const callBack = jest.fn((key, value) => key)
    const keys = Obj.mapObj(obj, callBack)

    expect(keys.length).toEqual(3)
    expect(keys.indexOf('test')).not.toEqual(-1)
    expect(keys.indexOf('sub')).not.toEqual(-1)
    expect(keys.indexOf('data')).not.toEqual(-1)
    expect(callBack).toHaveBeenCalledTimes(3)
  })

})