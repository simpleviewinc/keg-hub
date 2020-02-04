'use strict'

const Url = require('../url')

describe('/url', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('queryToObj', () => {

    it('should return a valid object with querystring items', () => {

      const obj = Url.queryToObj('?name=daniel&id=5')
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('5')

      const obj2 = Url.queryToObj('????????name=daniel&id=5')
      expect(obj2.name).toEqual('daniel')
      expect(obj2.id).toEqual('5')

      const obj3 = Url.queryToObj('/hello?name=daniel&id=5')
      expect(obj3.name).toEqual('daniel')
      expect(obj3.id).toEqual('5')

      const obj4 = Url.queryToObj('?name=some%20sentence%20with%20spaces')
      expect(obj4.name).toEqual('some sentence with spaces')

    })

    it('should return a valid object given array', () => {

      const obj = Url.queryToObj('?names=daniel,foo,man&id=5')
      expect(obj.names).toEqual(expect.arrayContaining(['daniel', 'foo', 'man']))
      expect(obj.id).toEqual('5')

      const obj2 = Url.queryToObj('?names=daniel,&id=5')
      expect(obj2.names).toEqual(expect.arrayContaining(['daniel']))
      expect(obj2.id).toEqual('5')

      const obj3 = Url.queryToObj('?name=daniel&groups=1%2C2%2C3')
      expect(obj3.groups).toEqual(expect.arrayContaining(['1','2','3']))
      expect(obj3.name).toEqual('daniel')
      

    })

    it('should return the last set of valid querystring items', () => {

      const obj = Url.queryToObj('?name=daniel&id=5^^^*^*^*^*^*^foo=bar')
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('5^^^*^*^*^*^*^foo=bar')
      expect (obj.foo).toEqual(undefined)

      const obj2 = Url.queryToObj('?color=foobar???name=daniel&id=5')
      expect(obj2.name).toEqual('daniel')
      expect(obj2.id).toEqual('5')
      expect (obj.color).toEqual(undefined)

    })

    it('should return empty object on invalid querystring', () => {

      const obj = Url.queryToObj('just some random string?')
      expect(obj).toEqual({})

      const obj3 = Url.queryToObj('just some random string')
      expect(obj3).toEqual({})

    })

    it('should combine duplicate keys into array', () => {

      const obj = Url.queryToObj('?names=daniel&names=foo')
      expect(obj.names).toEqual(expect.arrayContaining(['daniel', 'foo']))

      const obj2 = Url.queryToObj('?names=&names=foo')
      expect(obj2.names).toEqual(expect.arrayContaining(['foo', '']))

    })
  })

  describe('isValidUrl', () => {

    it('should return TRUE for valid urls', () => {

      const urls = [
        "https://google.com?name=daniel&id=1",
        "http://google.com????",
        "https://www.google.uk",
        "https://zsales.zerista.com"
      ]

      urls.map((url) => {
        expect(Url.isValidUrl(url)).toBe(true)
      })
    })

    it('should return FALSE for invalid urls', () => {

      const urls = [
        "hasdfas://google.com?name=daniel&id=1",
        "//google.com????",
        "htp://www.google.uk",
        "zsales.zerista.com"
      ]

      urls.map((url) => {
        expect(Url.isValidUrl(url)).toBe(false)
      })
    })

        
  })

  describe('objToQuery', () => {

    it('return a valid querystring from the given object with strings', () => {

      const obj = {
        name: 'daniel',
        food: 'pasta'
      }
      const result = Url.objToQuery(obj)
      expect(result).toEqual('?name=daniel&food=pasta')

      const obj2 = {
        name: 'some sentence with spaces',
      }
      const result2 = Url.objToQuery(obj2)
      expect(result2).toEqual('?name=some%20sentence%20with%20spaces')

    })

    it('return a valid querystring from the given object with number', () => {

      const obj = {
        name: 'daniel',
        id: 100
      }
      const result = Url.objToQuery(obj)
      expect(result).toEqual('?name=daniel&id=100')

    })

    it('return a valid querystring from the given object with nested object', () => {

      const obj = {
        name: 'daniel',
        id: {
          foo: 'bar'
        }
      }
      const result = Url.objToQuery(obj)
      // just appends the nested object via JSON string
      expect(result).toEqual('?name=daniel&id=%7B%22foo%22%3A%22bar%22%7D')

    })

    it('return a valid querystring from the given object with boolean', () => {

      const obj = {
        name: 'daniel',
        alive: true
      }
      const result = Url.objToQuery(obj)
      // just appends the nested object via JSON string
      expect(result).toEqual('?name=daniel&alive=true')

    })

    it('should convert array object for commas', () => {

      const obj = {
        name: 'daniel',
        groups: [1, 2, 3]
      }
      const result = Url.objToQuery(obj)
      expect(result).toEqual('?name=daniel&groups=1%2C2%2C3')

    })

    it('should return valid inputs only, invalid inputs are excluded', () => {

      const obj = {
        name: 'daniel',
        func: () => {}
      }
      const result = Url.objToQuery(obj)
      expect(result).toEqual('?name=daniel')

    })

    it('should return emptystring on null or empty obj', () => {

      expect(Url.objToQuery({})).toEqual('')
      expect(Url.objToQuery(null)).toEqual('')

    })

  })
})