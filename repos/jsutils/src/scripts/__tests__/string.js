'use strict'
import { uuid } from '../method'

const Str = require('../string')

describe('/string', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('camelCase', () => {

    it('should convert a string to camel case', () => {
      expect(Str.camelCase('CAMEL_CASE')).toEqual('camelCase')
    })

    it('should handle spaces', () => {
      expect(Str.camelCase('CAMEL case')).toEqual('camelCase')
    })

    it('should handle dashs', () => {
      expect(Str.camelCase('CAmEL_case')).toEqual('camelCase')
    })

    it('should handle a mix of spaces dashes and low dashes', () => {
      expect(Str.camelCase('CAm_EL cas-e')).toEqual('camElCasE')
    })

    
  })

  describe('clean', () => {
    it('should clean a string by removing _ and -', () => {
      expect(Str.cleanStr('STRING_CLEAN-DASH')).toEqual('STRING CLEAN DASH')
    })
  })

  describe('capitalize', () => {

    it('should capitalize the first letter of a string', () => {
      const dirty = 'first letter Capitalize'
      const clean = 'First letter capitalize'
      const cleaned = Str.capitalize(dirty)

      expect(cleaned).toEqual(clean)
    })

    it('should lowerCase other characters', () => {
      const dirty = 'first letter capitalize'
      const cleaned = Str.capitalize(dirty)

      expect(cleaned.indexOf('Capitalize')).toEqual(-1)
    })

    it('should return passed in data when data is not a string', () => {
      const dirty = {}
      const cleaned = Str.capitalize(dirty)

      expect(cleaned).toEqual(dirty)
    })
  })

  describe('isStr', () => {
    it('should check if some data is a string', () => {
      const amString = 'I am a string'
      const notString = {}

      expect(Str.isStr(amString)).toEqual(true)
      expect(Str.isStr(notString)).toEqual(false)
    })
  })

  describe('isEmail', () => {
    it('should check if some data is a email string', () => {
      const amValid1 = 'lt@test.com'
      const amValid2 = 's@e.co'
      const notValid1 = {}
      const notValid2 = 'failed$test.com'
      const notValid3 = 'failed@test'

      expect(Str.isEmail(amValid1)).toEqual(true)
      expect(Str.isEmail(amValid2)).toEqual(true)
      expect(Str.isEmail(notValid1)).toEqual(false)
      expect(Str.isEmail(notValid2)).toEqual(false)
      expect(Str.isEmail(notValid3)).toEqual(false)
    })
  })

  describe('isPhone', () => {
    it('should check if some data is a phone number string', () => {
      const amValid1 = '1231231234'
      const amValid2 = '123-123-1234'
      const notValid1 = {}
      const notValid2 = '1w2123123R'
      const notValid3 = '623-123-12345'

      expect(Str.isPhone(amValid1)).toEqual(true)
      expect(Str.isPhone(amValid2)).toEqual(true)
      expect(Str.isPhone(notValid1)).toEqual(false)
      expect(Str.isPhone(notValid2)).toEqual(false)
      expect(Str.isPhone(notValid3)).toEqual(false)
    })
  })

  describe('isUrl', () => {
    it('should check if some data is a url string', () => {
      const amValid1 = 'www.test.com'
      const amValid2 = 'test.com'
      const amValid3 = 'https://pass.com'
      const amValid4 = 'http://www.pass.com'
      const notValid1 = {}
      const notValid2 = 'test'
      const notValid3 = 'https://fail'

      expect(Str.isUrl(amValid1)).toEqual(true)
      expect(Str.isUrl(amValid2)).toEqual(true)
      expect(Str.isUrl(amValid3)).toEqual(true)
      expect(Str.isUrl(amValid4)).toEqual(true)
      
      expect(Str.isUrl(notValid1)).toEqual(false)
      expect(Str.isUrl(notValid2)).toEqual(false)
      expect(Str.isUrl(notValid3)).toEqual(false)
    })
  })

  describe('isUuid', () => {
    it('should check if some data is a uuid string', () => {
      const amValid1 = `d3aa88e2-c754-41e0-8ba6-4198a34aa0a2`
      const amValid2 = uuid()
      const notValid1 = `abcdef00-0000-0000-0000-000000000000`
      const notValid2 = `d3aa88e2-c754-41ex-8ba6-4198a34aa0a2`
      const notValid3 = '123-123-12345-432-1'

      expect(Str.isUuid(amValid1)).toEqual(true)
      expect(Str.isUuid(amValid2)).toEqual(true)
      expect(Str.isUuid(notValid1)).toEqual(false)
      expect(Str.isUuid(notValid2)).toEqual(false)
      expect(Str.isUuid(notValid3)).toEqual(false)
    })
  })


  describe('parseJSON,', () => {

    it('should parse json string into an object', () => {
      const amString = JSON.stringify({ test: 'I am a string' })
      expect(typeof amString).toEqual('string')

      expect(typeof Str.parseJSON(amString)).toEqual('object')
    })

    it('should call console.error and not throw on invalid json', () => {
      const consoleErr = console.error
      console.error = jest.fn()
      const amString = JSON.stringify({ test: 'I am a string' }) + '#$^$#'
      const notObj = Str.parseJSON(amString)

      expect(console.error).toHaveBeenCalled()
      expect(notObj).toEqual(null)

      console.error = consoleErr
    })

  })

  describe('plural', () => {
    it('adds s to word not ending in s', () => {
      expect(Str.plural('string')).toEqual('strings')
    })

    it('does not add s to word ending in s', () => {
      expect(Str.plural('strings')).toEqual('strings')
    })
  })

  describe('removeDot', () => {

    it('should remove . from start and end of a string', () => {
      expect(Str.removeDot('.string.')).toEqual('string')
      expect(Str.removeDot('.string')).toEqual('string')
      expect(Str.removeDot('string.')).toEqual('string')
    })

    it('does change a string with not dots', () => {
      expect(Str.removeDot('string')).toEqual('string')
    })

  })

  describe('sanitize', () => {
    it('should strip html from string', () => {
      const dirty = '<p>This is the dirty string</p>'
      const clean = '&lt;p&gt;This is the dirty string&lt;/p&gt;'
      const cleaned = Str.sanitize(dirty)

      expect(cleaned).toEqual(clean)
    })
  })

  describe('singular', () => {
    it('removes s from word ending in s', () => {
      expect(Str.singular('strings')).toEqual('string')
    })

    it('does not modify string not ending in s', () => {
      expect(Str.singular('string')).toEqual('string')
    })
  })

  describe('styleCase', () => {
    it('should convert a string into style case', () => {
      expect(Str.styleCase('background-color')).toEqual('backgroundColor')
    })

    it('should handle spaces', () => {
      expect(Str.styleCase('background color')).toEqual('backgroundColor')
    })

    it('should handle low dashes', () => {
      expect(Str.styleCase('background-color')).toEqual('backgroundColor')
    })

    it('should handle mixed spaces dashes and low dashes', () => {
      expect(Str.styleCase('-background color_')).toEqual('backgroundColor')
    })

  })

  describe('trainCase', () => {

    it('should convert a string into train case', () => {
      const testString = 'I am A strIng'
      const trainCase = Str.trainCase(testString)

      expect(trainCase).toEqual('i-am-a-str-ing')
    })

    it('should return passed in data when data is not a string', () => {
      const dirty = {}
      const cleaned = Str.trainCase(dirty)

      expect(cleaned).toEqual(dirty)
    })

  })

  describe('wordCaps', () => {

    it('should capitalize each word of a string', () => {
      expect(Str.wordCaps('i should be capitalized'))
        .toEqual('I Should Be Capitalized')
    })

    it('should make all chars lowercase except the first', () => {
      expect(Str.wordCaps('i shOuld bE caPitalized'))
        .toEqual('I Should Be Capitalized')
    })

  })

  describe('snakeCase', () => {
    const cases = [
      'fooBar',
      'foo_bar',
      'FOO_BAR',
      'FooBar',
      'FooBAR',
      'foo-bar',
      'foo-BAR',
      'Foo-Bar',
      'FOO-BAR',
      'Foo Bar',
      'foo bar',
    ]
    
    cases.map(str => {
      it(`should convert ${str} to snake case`, () => {
        const result = Str.snakeCase(str)
        expect(result).toEqual('foo_bar')
      }) 
    })

    it('should leave a single word unchanged', () => {
      const word = 'foo'
      expect(Str.snakeCase(word)).toEqual('foo')
    })
  })

  describe('mapString', () => {
    it('should map each character', () => {
      const result = Str.mapString(
        'test',
        c => c === 's' ? 'x' : c
      )
      expect(result).toEqual('text')
    })
  })

})
