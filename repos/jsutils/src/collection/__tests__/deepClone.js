const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')


describe('deepClone', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should create a copy of the passed in object collection', () => {
    const org = { foo: 'bar' }
    const clone  = Coll.deepClone(org)

    expect(clone === org).toEqual(false)
    expect(Object.keys(clone).length).toEqual(1)
    expect(clone.foo).toEqual('bar')
    
  })

  it('should create a copy of the passed in array collection', () => {
    const org = [ 'foo', 'bar' ]
    const clone  = Coll.deepClone(org)

    expect(clone === org).toEqual(false)
    expect(clone.length).toEqual(2)
    expect(clone[0]).toEqual('foo')
    expect(clone[1]).toEqual('bar')
    
  })

  describe('preserving the source types when cloning', () => {
    class Foo {}
    const testCases = [
      [[], isArr], 
      [{}, isObj],
      [1, Number.isInteger ],
      [new Foo(), x => (x instanceof Foo)],
      [new Date(), x => (x instanceof Date)],
      ["hi", x => (typeof x === 'string')],
    ]

    testCases.map(([source, predicate], idx) => {
      it(`should preserve the source type for test case ${idx}`, () => {
        const clone = Coll.deepClone(source)
        expect(predicate(clone)).toBe(true)
      })
    })
  })

  it('should create a deep copy of the passed in object collection', () => {
    const org = { foo: { bar: 'baz' } }
    const clone  = Coll.deepClone(org)

    expect(clone === org).toEqual(false)
    expect(clone.foo === org.foo).toEqual(false)
    expect(clone.foo.bar).toEqual('baz')

  })

  it('should create a deep copy of the passed in array collection', () => {
    const org = [ [ 'foo', 'baz' ], [ 'bar' ] ]
    const clone  = Coll.deepClone(org)

    expect(clone[0] === org[0]).toEqual(false)
    expect(clone[1] === org[1]).toEqual(false)
    expect(clone.length).toEqual(2)
    expect(clone[0][0]).toEqual('foo')
    expect(clone[1][0]).toEqual('bar')

  })

  it('should create a deep copy of the passed in object with arrays with objects', () => {
    const org = { das: [ { bar: [ 'foo', 'baz' ] } ] }
    const clone  = Coll.deepClone(org)

    expect(clone.das === org.das).toEqual(false)
    expect(clone.das[0] === org.das[0]).toEqual(false)
    expect(clone.das[0].bar === org.das[0].bar).toEqual(false)
    expect(clone.das[0].bar[0]).toEqual('foo')
    expect(clone.das[0].bar[1]).toEqual('baz')
  })

  it('should make a frozen clone if the source is frozen', () => {
    const source = Object.freeze({a: 1})
    const clone = Coll.deepClone(source)
    expect(Object.isFrozen(clone)).toBe(true)
  })

  it('should preserve all properties from an object created using a constructor', () => {
    class TestObject {
      constructor (a) { 
        this.a = a;
      }
    }
    const source = new TestObject(1)
    const clone = Coll.deepClone(source)
    expect(clone.a).toEqual(source.a)
  })

  it('should preserve the prototype', () => {
    class Foo {}
    class Bar extends Foo {}
    const source = new Bar()
    const clone = Coll.deepClone(source)
    expect(Object.getPrototypeOf(clone)).toEqual(Object.getPrototypeOf(source))
  }),

  it('should make a sealed clone if the source is sealed', () => {
    const source = Object.seal({a: 1})
    const clone = Coll.deepClone(source)
    expect(Object.isSealed(clone)).toBe(true)
  })

})
