'use strict'
const Str = require('../string')



describe('/string', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      const dirty = 'first letter Capitalize'
      const clean = 'First letter Capitalize'
      const cleaned = Str.capitalize(dirty)

      expect(cleaned).toEqual(clean)
    })
    it('should not lowerCase other characters', () => {
      const dirty = 'first letter Capitalize'
      const cleaned = Str.capitalize(dirty)

      expect(cleaned.indexOf('Capitalize')).toEqual(dirty.indexOf('Capitalize'))
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

  describe('parseJSONString,', () => {

    it('should parse json string into an object', () => {
      const amString = JSON.stringify({ test: 'I am a string' })
      expect(typeof amString).toEqual('string')

      expect(typeof Str.parseJSONString(amString)).toEqual('object')
    })

    it('should call console.error and not throw on invalid json', () => {
      const consoleErr = console.error
      console.error = jest.fn()
      const amString = JSON.stringify({ test: 'I am a string' }) + '#$^$#'
      const notObj = Str.parseJSONString(amString)

      expect(console.error).toHaveBeenCalled()
      expect(notObj).toEqual(null)

      console.error = consoleErr
    })

  })

  describe('sanitizeString', () => {
    it('should strip u2028-u2029 from string', () => {
      const dirty = 'This \u2028is the \u2029dirty string'
      const clean = 'This is the dirty string'
      const cleaned = Str.sanitizeString(dirty)

      expect(cleaned).toEqual(clean)
    })
  })

  describe('sanitizeCopyObject', () => {

    it('should strip u2028-u2029 from object', () => {
      const dirtyObject = {
        name: 'Test name',
        text: 'U-2028 \u2028characters \u2029here'
      }
      const cleanText = 'U-2028 characters here'
      const cleanObject = Str.sanitizeCopyObject(dirtyObject)

      expect(cleanObject).not.toEqual(dirtyObject)
      expect(cleanObject.name).toEqual(dirtyObject.name)
      expect(cleanObject.text).toEqual(cleanText)
    })
  })

  describe('toTrainCase', () => {

    it('should convert a string into train case', () => {
      const testString = 'I am A strIng'
      const trainCase = Str.toTrainCase(testString)

      expect(trainCase).toEqual('i-am-a-string')
    })

    it('should return passed in data when data is not a string', () => {
      const dirty = {}
      const cleaned = Str.toTrainCase(dirty)

      expect(cleaned).toEqual(dirty)
    })

  })


  describe('trimObjectStringFields', () => {

    it('should trim all string fields of an object', () => {
      const testObj = { test: '   I am A strIng   ', data: [ 1,2,3,4 ] }
      const trimmedObj = Str.trimObjectStringFields(testObj)

      expect(trimmedObj.test).toEqual('I am A strIng')
    })

    it('should not change non-string fields', () => {
      const testObj = { test: '   I am A strIng   ', data: [ 1,2,3,4 ] }
      const trimmedObj = Str.trimObjectStringFields(testObj)

      expect(trimmedObj.data).toEqual(testObj.data)
    })

  })

})
