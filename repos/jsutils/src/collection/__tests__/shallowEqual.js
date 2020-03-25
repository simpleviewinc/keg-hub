const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('shallowEqual', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return true when the collections key values are the same', () => {
    const col1 = { foo: 'bar', baz: 1 }
    const col2 = { foo: 'bar', baz: 1 }

    expect(col1 === col2).toEqual(false)
    expect(Coll.shallowEqual(col1, col2)).toEqual(true)

  })

  it('should return true when the collections are the same', () => {
    const col1 = { foo: 'bar', baz: 1 }
    const col2 = col1

    expect(col1 === col2).toEqual(true)
    expect(Coll.shallowEqual(col1, col2)).toEqual(true)

  })

  it('should return true when the objects have the same keys but are not the same', () => {
    const col1 = { 0: 'foo', 1: 'bar' }
    const col2 = [ 'foo', 'bar' ]
    
    expect(col1 === col2).toEqual(false)
    expect(Coll.shallowEqual(col1, col2)).toEqual(true)

  })

  it('should return false when the collections key values are NOT the same', () => {
    const col1 = { foo: 'bar', baz: [] }
    const col2 = { foo: 'bar' }

    const col3 = { foo: 'bar', baz: [] }
    const col4 = { foo: 'bar', baz: [] }

    expect(col1 === col2).toEqual(false)
    expect(Coll.shallowEqual(col1, col2)).toEqual(false)

    expect(col3 === col4).toEqual(false)
    expect(Coll.shallowEqual(col3, col4)).toEqual(false)

  })

  it('should return false when either of the arguments is not a collection', () => {
    const col1 = { foo: 'bar', baz: 1 }
    const col2 = 'FAIL'

    expect(Coll.shallowEqual(col1, col2)).toEqual(false)
    expect(Coll.shallowEqual(col2, col1)).toEqual(false)

  })

  it('should return false when either of the arguments dont exist', () => {
    const col1 = { foo: 'bar', baz: 1 }
    const col2 = undefined

    expect(Coll.shallowEqual(col1, col2)).toEqual(false)
    expect(Coll.shallowEqual(col2, col1)).toEqual(false)

  })

  it('should compare sub-keys when a path is passed as third argument', () => {
    const col1 = { foo: { bar: { baz: 'biz' }}}
    const col2 = { foo: { bar: { baz: 'biz' }}}

    expect(col1 === col2).toEqual(false)

    // Should fail with no path
    expect(Coll.shallowEqual(col1, col2)).toEqual(false)

    // Pass in the path, to compare sub-key object
    expect(Coll.shallowEqual(col1, col2, 'foo.bar')).toEqual(true)

  })

})

