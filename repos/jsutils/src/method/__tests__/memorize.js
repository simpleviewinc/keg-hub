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
    const getCacheKey = jest.fn(() => key)
    const memo = Method.memorize(func, { getCacheKey })

    memo()

    expect(getCacheKey).toHaveBeenCalled()

    memo.destroy()

  })

  it('should return the last response and not call the passed in method', () => {
    const key = 'test'
    const getCacheKey = jest.fn(() => key)

    ;[ getCacheKey, null ].map(getCacheKey => {
      const func = jest.fn(data => { return data })
      const memo = Method.memorize(func, { getCacheKey })
      expect(memo('test')).toBe(memo('test'))
      expect(func).toHaveBeenCalledTimes(1)
      memo.destroy()
    })
  })

  it ('should memoize empty args', () => {
    const func = jest.fn(() => 1)
    const memo = Method.memorize(func)
    expect(memo()).toEqual(1)
    expect(memo()).toEqual(1)
    expect(func).toBeCalledTimes(1)
  })

  it ('should work with reference-types, by default', () => {
      const func = jest.fn((...args) => { return args })
      const memo = Method.memorize(func)
      const input = [
        { a: 1 },
        [ 1, 2, 3 ]
      ]
      expect(memo(...input)).toBe(memo(...input))

      expect(func).toHaveBeenCalledTimes(1)

      memo.destroy()
  })

  it ('should memoize all arguments, by default', () => {
    const func = jest.fn((...args) => args)
    const memo = Method.memorize(func)

    const input = [ 1, 'hello' ]
    const otherInput = [ 1 ]

    expect(memo(...input)).toEqual(input)
    expect(memo(...otherInput)).toEqual(otherInput)
    expect(func).toHaveBeenCalledTimes(2)
    expect(
      memo(...input)
    ).not.toBe(memo(...otherInput))

    memo.destroy()
  })

  it('should return a function with cache object added to it', () => {
    const key = 'test'
    const getCacheKey = jest.fn(() => key)

    ;[ getCacheKey, null ].map(getCacheKey => {
      const func = jest.fn(data => { return data })
      const memo = Method.memorize(func, { getCacheKey })

      memo('test')

      expect(typeof memo.cache).toBe('object')

      memo.destroy()
    })

  })

  it('should set the response to the memorize cache', () => {

    const key = 'test'
    const getCacheKey = jest.fn(() => key)

    ;[ getCacheKey, null ].map(getCacheKey => {
      const func = jest.fn(data => { return data })
      const memo = Method.memorize(func, { getCacheKey })

      const resp = memo('test')
      
      expect(memo.cache.get([key])).toBe(resp)

      memo.destroy()
    })
  })

  it('should return a function with destroy function added to it', () => {

    const func = jest.fn(data => { return data })
    const key = 'test'
    const getCacheKey = jest.fn(() => key)
    const memo = Method.memorize(func, { getCacheKey })

    memo('test')

    expect(typeof memo.destroy).toBe('function')

    memo.destroy()

  })

  it('should clean up cache and destroy keys when memorize.destroy is called', () => {

    const func = jest.fn(data => { return data })
    const key = 'test'
    const getCacheKey = jest.fn(() => key)
    const memo = Method.memorize(func, { getCacheKey })

    const resp = memo('test')

    expect(typeof getCacheKey).toBe('function')

    memo.destroy()

    expect(memo.cache).toBe(undefined)
    expect(memo.destroy).toBe(undefined)

  })

  it('should have no limit by default', () => {

    let count = 0
    const func = jest.fn(data => { return count++ })
    const memo = Method.memorize(func)

    const respFoo = memo('foo')
    expect(memo.cache.get(['foo'])).toBe(respFoo)

    const respBar = memo('bar')
    expect(memo.cache.get(['foo'])).toBe(respFoo)
    expect(memo.cache.get(['bar'])).toBe(respBar)

    memo.destroy()
  })

  it('should change the limit based on the limit option', () => {

    let count = 0
    const func = jest.fn(_ => { return count++ })
    const memo = Method.memorize(func, { limit: 2 })

    const respFoo = memo('foo')
    const respBar = memo('bar')

    expect(memo.cache.get(['foo'])).toBe(respFoo)
    expect(memo.cache.get(['bar'])).toBe(respBar)

    const respBaz = memo('baz')

    expect(memo.cache.get(['foo'])).toBe(undefined)
    expect(memo.cache.get(['bar'])).toBe(undefined)
    expect(memo.cache.get(['baz'])).toBe(respBaz)

    memo.destroy()

  })


  it('should have no limit if the limit option is not a number', () => {

    let count = 0
    const func = jest.fn(data => { return count++ })
    const memo = Method.memorize(func, { limit: 'test: not a number!' })

    const respFoo = memo('foo')
    expect(memo.cache.get(['foo'])).toBe(respFoo)

    const respBar = memo('bar')

    expect(memo.cache.get(['foo'])).toBe(respFoo)
    expect(memo.cache.get(['bar'])).toBe(respBar)

    memo.destroy()

  })

})
