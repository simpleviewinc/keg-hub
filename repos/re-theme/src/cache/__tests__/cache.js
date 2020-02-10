
import { testTheme as theme, buttonTheme } from '../../mocks'

jest.resetModules()

const Cache = require('../cache')


describe('Cache', () => {

  describe('convertToId', () => {
    
    afterEach(() => jest.clearAllMocks())

    it('should convert an array of strings or child arrays to a string id', () => {

      const id = Cache.convertToId([
        [ '1', '2', '3' ],
        [ 'test', 'id' ]
      ])

      expect(id).toBe('1-2-3-test-id')

    })


    it('should work with mixed child string and arrays', () => {

      const id = Cache.convertToId([
        '1.2.3',
        [ 'test', 'id' ]
      ])

      expect(id).toBe('1.2.3-test-id')

    })

    it('should work with only child strings', () => {

      const id = Cache.convertToId([
        '1.2.3',
        'test-id'
      ])

      expect(id).toBe('1.2.3-test-id')

    })

    it('should work with only child arrays', () => {

      const id = Cache.convertToId([
        [ '1', '2', '3' ],
        [ 'test', 'id' ]
      ])

      expect(id).toBe('1-2-3-test-id')

    })

    it('should only return an id when an array is passed', () => {

      expect(Cache.convertToId({ test: 'data' })).toBe(false)
      expect(Cache.convertToId('test-data')).toBe(false)
      expect(Cache.convertToId(100)).toBe(false)

    })

    it('should only use strings and array of strings from the passed in array for the id', () => {

      const id = Cache.convertToId([
        '1.2.3',
        { foo: 'bar' },
        [ 'test', 'id' ],
        100
      ])

      expect(id).toBe('1.2.3-test-id')

    })

  })

  describe('clearCache', () => {
    
    afterEach(() => jest.clearAllMocks())

    it('should remove a key from the cache object when a key is passed', () => {

      const data = { foo: 'bar' }
      Cache.addCache('test', data)

      expect(Cache.getCache('test')).toBe(data)

      Cache.clearCache('test')

      expect(Cache.getCache('test')).toBeFalsy()

    })

    it('should remove all cache when NO key is passed', () => {

      const data = { foo: 'bar' }
      const data2 = { bas: 'baz' }

      Cache.addCache('test', data)
      Cache.addCache('test2', data2)

      expect(Cache.getCache('test')).toBe(data)
      expect(Cache.getCache('test2')).toBe(data2)

      Cache.clearCache()

      expect(Cache.getCache('test')).toBeFalsy()
      expect(Cache.getCache('test2')).toBeFalsy()

    })

  })

  describe('getCache', () => {
    
    afterEach(() => {
      Cache.clearCache()
      jest.clearAllMocks()
    })

    it('should get a cached object by key', () => {

      const data = { foo: 'bar' }
      Cache.addCache('test', data)

      expect(Cache.getCache('test')).toBe(data)

    })

    it('should get all cached objects when no key is passed', () => {

      const data = { foo: 'bar' }
      const data2 = { bas: 'baz' }

      Cache.addCache('test', data)
      Cache.addCache('test2', data2)

      const test = Cache.getCache('test')
      const test2 = Cache.getCache('test2')
      const allCache = Cache.getCache()

      expect(allCache.test).toBe(test)
      expect(allCache.test2).toBe(test2)

    })

  })

  describe('addCache', () => {

    afterEach(() => {
      Cache.clearCache()
      jest.clearAllMocks()
    })

    it('should add a cache object by key', () => {

      const data = { foo: 'bar' }
      Cache.addCache('test', data)

      expect(Cache.getCache('test')).toBe(data)

    })

    it('should not add cache object when no key is passed', () => {

      const data = { foo: 'bar' }
      Cache.addCache(null, data)

      expect(Cache.getCache('test')).toBe(undefined)

    })

    it('should not add cache object when no cache is passed', () => {

      Cache.addCache('test')

      expect(Cache.getCache('test')).toBe(undefined)

    })

  })

  describe('checkCache', () => {
    
    afterEach(() => jest.clearAllMocks())

    it('should return an object with memoId and cache keys', () => {
      const cacheCheck = Cache.checkCache([ '123.test' ])
      const cacheKeys = Object.keys(cacheCheck)

      Array.from([ 'memoId', 'cache' ]).map(key =>
        expect(cacheKeys.indexOf(key) !== -1).toBe(true)
      )

    })

    it('should return a memoId if the last item in passed in array is a string', () => {

      const cacheCheck = Cache.checkCache([ '123.test' ])

      expect(cacheCheck.memoId).toBe('123.test')

    })

    it('should return a memoId if the last item in passed in array is an array of strings', () => {

      const cacheCheck = Cache.checkCache([ 'other-item', [ '123', 'test' ] ])

      expect(cacheCheck.memoId).toBe('123-test')

    })

    it('should get memoId from first element in array when the second argument is not end', () => {

      const cacheCheck = Cache.checkCache([ 'other-item', [ '123', 'test' ] ], 'start')

      expect(cacheCheck.memoId).toBe('other-item')

    })


    it('should return falsy for cache object when no cache exists for the id', () => {

      const cacheCheck = Cache.checkCache([ 'other-item', [ '123', 'test' ] ])

      expect(cacheCheck.cache).toBeFalsy()

    })

    it('should return the cache object when cache exists for the id', () => {

      const data = { foo: 'bar' }
      Cache.addCache('123-test', data)

      expect(Cache.getCache('123-test')).toBe(data)

      const cacheCheck = Cache.checkCache([ 'other-item', [ '123', 'test' ] ])

      expect(cacheCheck.cache).toBe(data)

    })

  })

  describe('buildCacheObj', () => {
    
    afterEach(() => jest.clearAllMocks())

    it('', () => {


    })
    
  })

})