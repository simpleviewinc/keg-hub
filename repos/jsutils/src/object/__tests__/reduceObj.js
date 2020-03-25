const Obj = require('../')

describe('reduceObj', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should call the callback on all object properties', () => {
    const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
    const keys = []
    const callBack = jest.fn((key, value, obj) => {
      keys.push(key)
      return obj
    })

    Obj.reduceObj(obj, callBack)

    expect(keys.length).toEqual(3)
    expect(keys.indexOf('test')).not.toEqual(-1)
    expect(keys.indexOf('sub')).not.toEqual(-1)
    expect(keys.indexOf('data')).not.toEqual(-1)
    expect(callBack).toHaveBeenCalledTimes(3)
  })

  it('should return object from the last callback', () => {
    const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
    const callBack = jest.fn((key, value, obj) => {
      obj.called = obj.called || 0
      obj.called += 1

      return obj
    })
    const reduceObj = Obj.reduceObj(obj, callBack)

    expect(typeof reduceObj).toEqual('object')
    expect(reduceObj.called).toEqual(3)
  })

})

