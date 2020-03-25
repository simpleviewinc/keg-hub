const Obj = require('../')

describe('pickKeys', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return object with keys in passed in array', () => {
    const obj = { test: 'I should exist', sub: [ 1, 2, 3 ], data: 'I should not exist' }
    const picked = Obj.pickKeys(obj, [ 'data', 'sub' ])

    expect(picked.sub).toEqual(obj.sub)
    expect(picked.data).toEqual(obj.data)
    expect(picked.test).toEqual(undefined)
  })

  it('should not add non-existing keys to the return object', () => {
    const obj = { test: 'I should exist', sub: [ 1, 2, 3 ], data: 'I should not exist' }
    const picked = Obj.pickKeys(obj, [ 'data', 'sub', 'duper' ])

    expect(picked.sub).toEqual(obj.sub)
    expect(picked.data).toEqual(obj.data)
    expect('duper' in picked).toEqual(false)
  })

  it('should return empty object if first param is not an object', () => {
    const emptyObj = Obj.pickKeys('I am not an object', [])

    expect(Obj.isObj(emptyObj)).toBe(true)
    expect(Object.keys(emptyObj).length).toEqual(0)
  })

})