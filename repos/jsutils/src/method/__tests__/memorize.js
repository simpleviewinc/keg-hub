const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('memorize', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return a function', () => {

    const memo = Method.memorize(() => {})

    expect(typeof memo).toBe('function')

    memo.destroy()

  })

  it('should call the getCacheKey function if its passed as a function', () => {
    const func = data => { return data }
    const key = 'test'
    const getKey = jest.fn(() => key)
    const memo = Method.memorize(func, getKey)

    memo()

    expect(getKey).toHaveBeenCalled()

    memo.destroy()

  })

  it('should return the last response and not call the passed in method', () => {
    const func = jest.fn(data => { return data })
    const key = 'test'
    const getKey = jest.fn(() => key)
    const memo = Method.memorize(func, getKey)

    expect(memo('test')).toBe(memo('test'))
    
    expect(func).toHaveBeenCalledTimes(1)
    
    memo.destroy()

  })

  it('should return a function with cache object added to it', () => {

    const func = jest.fn(data => { return data })
    const key = 'test'
    const getKey = jest.fn(() => key)
    const memo = Method.memorize(func, getKey)

    memo('test')

    expect(typeof memo.cache).toBe('object')

    memo.destroy()

  })

  it('should set the response to the memorize cache', () => {

    const func = jest.fn(data => { return data })
    const key = 'test'
    const getKey = jest.fn(() => key)
    const memo = Method.memorize(func, getKey)

    const resp = memo('test')
    
    expect(memo.cache[key]).toBe(resp)

    memo.destroy()

  })

  it('should return a function with destroy function added to it', () => {

    const func = jest.fn(data => { return data })
    const key = 'test'
    const getKey = jest.fn(() => key)
    const memo = Method.memorize(func, getKey)

    memo('test')

    expect(typeof memo.destroy).toBe('function')

    memo.destroy()

  })

  it('should clean up cache and destroy keys when memorize.destroy is called', () => {

    const func = jest.fn(data => { return data })
    const key = 'test'
    const getKey = jest.fn(() => key)
    const memo = Method.memorize(func, getKey)

    const resp = memo('test')

    expect(typeof getKey).toBe('function')

    memo.destroy()

    expect(memo.cache).toBe(undefined)
    expect(memo.destroy).toBe(undefined)

  })

  it('should reset cache after the limit has been reached', () => {

    let count = 0
    const func = jest.fn(data => { return count++ })
    const getKey = jest.fn(() => count)
    const memo = Method.memorize(func, getKey)

    const respFoo = memo('foo')
    expect(memo.cache[0]).toBe(respFoo)

    const respBar = memo('bar')
    expect(memo.cache[0]).toBe(undefined)
    expect(memo.cache[1]).toBe(respBar)

    memo.destroy()

  })


  it('should change the limit based on the third passed in parameter', () => {

    let count = 0
    const func = jest.fn(data => { return count++ })
    const getKey = jest.fn(() => count)
    const memo = Method.memorize(func, getKey, 2)

    const respFoo = memo('foo')
    const respBar = memo('bar')

    expect(memo.cache[0]).toBe(respFoo)
    expect(memo.cache[1]).toBe(respBar)

    const respBaz = memo('baz')

    expect(memo.cache[0]).toBe(undefined)
    expect(memo.cache[1]).toBe(undefined)
    expect(memo.cache[2]).toBe(respBaz)

    memo.destroy()

  })


  it('should NOT change the limit if the third parameter is not a number', () => {

    let count = 0
    const func = jest.fn(data => { return count++ })
    const getKey = jest.fn(() => count)
    const memo = Method.memorize(func, getKey, 'test')

    const respFoo = memo('foo')
    expect(memo.cache[0]).toBe(respFoo)

    const respBar = memo('bar')

    expect(memo.cache[0]).toBe(undefined)
    expect(memo.cache[1]).toBe(respBar)

    memo.destroy()

  })

})
