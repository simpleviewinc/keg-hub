const Obj = require('../')

describe('omitKeys', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return object without keys in passed in array', () => {
    const obj = { test: 'I should exist', sub: [ 1, 2, 3 ], data: 'I should not exist' }
    const omitted = Obj.omitKeys(obj, [ 'data', 'sub' ])

    expect(omitted.sub).toEqual(undefined)
    expect(omitted.data).toEqual(undefined)
    expect(omitted.test).toEqual('I should exist')
  })

  it('should return empty object if first param is not an object', () => {
    const emptyObj = Obj.omitKeys('I am not an object', [])

    expect(Obj.isObj(emptyObj)).toBe(true)
    expect(Object.keys(emptyObj).length).toEqual(0)
  })

})
