
import { testTheme as theme, buttonTheme } from '../../mocks'
import { isObj, get } from 'jsutils'

const setupTest = (mockGet) => {

  jest.resetModules()

  const getTheme = jest.fn(() => {})
  mockGet && jest.setMock('../getTheme', { getTheme })

  const { joinTheme } = require('../joinTheme')

  return { joinTheme, getTheme }
}

describe('joinTheme', () => {

  it('should return an object', () => {
    const { joinTheme } = setupTest()

    expect(isObj(joinTheme({}, {}))).toBe(true)
    expect(isObj(joinTheme(null))).toBe(true)
    expect(isObj(joinTheme(false))).toBe(true)
    expect(isObj(joinTheme(1))).toBe(true)
    expect(isObj(joinTheme('string'))).toBe(true)

  })

  it('should return an object of the passed in the arguments merged together', () => {
    
    const { joinTheme } = setupTest()
    const joined = joinTheme({ RTMeta: {} }, [ { test: 'foo', bar: 'baz' } ], { test: 'boo', })

    expect(joined.test).toBe('boo')
    expect(joined.bar).toBe('baz')

  })

  it('should call getTheme with the passed in objects', () => {

    const { joinTheme, getTheme } = setupTest(true)

    const testObj = {}
    const testArr = []
    joinTheme(testObj, testArr, testObj)

    expect(getTheme).toHaveBeenCalled()
    expect(getTheme.mock.calls[0][0]).toBe(testObj)
    expect(getTheme.mock.calls[0][1]).toBe(testArr)
    expect(getTheme.mock.calls[0][2]).toBe(testObj)

  })

  it('should not pass the first object to getTheme if it has RTMeta key', () => {

    const { joinTheme, getTheme } = setupTest(true)
    
    const testObj = { RTMeta: {} }
    const testArr = []
    joinTheme(testObj, testArr, {})

    expect(getTheme).toHaveBeenCalled()
    expect(getTheme.mock.calls[0][0]).not.toBe(testObj)

  })

})