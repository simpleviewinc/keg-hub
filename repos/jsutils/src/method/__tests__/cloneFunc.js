const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('cloneFunc', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return a function', () => {
    expect(typeof Method.cloneFunc(() => { console.log('test') })).toBe('function')
  })

  it('should Not return the same function passed in', () => {

    const test = () => { console.log('test') }
    expect(Method.cloneFunc(test)).not.toBe(test)

  })

  it('should return a function with access to in scope variables', () => {

    const oldLog = console.log
    console.log = jest.fn()

    const data = 'test'
    const test = () => { console.log(data) }
    const clone = Method.cloneFunc(test)
    clone()

    expect(console.log).toHaveBeenCalledWith(data)

    console.log = oldLog
  })


  it('should return a function that returns the same content of the original', () => {

    const data = 'test'
    const test = () => { return data }
    const clone = Method.cloneFunc(test)

    expect(clone()).toBe(test())

  })


  it('should copy any extra keys and values added to the function', () => {

    const data = 'test'
    const test = () => { return data }
    test.extra = { foo: 'bar' }
    test.extra2 = 'baz'
    const clone = Method.cloneFunc(test)

    expect(clone.extra).toBe(test.extra)
    expect(clone.extra2).toBe(test.extra2)

  })

  it('should copy the functions name', () => {

    function test() { return 'test' }
    expect(test.name).toBe('test')

    const clone = Method.cloneFunc(test)

    expect(clone.name).toBe('test')

  })

  it('should have the same response from the toString method', () => {

    const test = () => { return 'test' }
    const clone = Method.cloneFunc(test)

    expect(clone.toString()).toBe(test.toString())

  })

})
