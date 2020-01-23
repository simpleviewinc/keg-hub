import { Mocks } from 'SVMocks'

const { getOrThrow } = require('../getOrThrow')

const testRootObj = {
  test: { foo: [ 'bar' ] },
}

describe('getOrThrow', () => {
  beforeEach(() => Mocks.resetMocks())

  it('should get a value from the path when it exists', () => {
    expect(getOrThrow(testRootObj, 'test.foo.0')).toBe('bar')
  })

  it('should return the default when the path does not exists', () => {
    expect(getOrThrow(testRootObj, 'test.foo.3', 'boo')).toBe('boo')
  })

  it('should not throw when __DEV__ is false and no value is found', () => {
    const oldWarn = console.warn
    console.warn = jest.fn()
    __DEV__ = false

    expect(() => {
      getOrThrow(testRootObj, 'test.foo.3')
    }).not.toThrow()

    __DEV__ = true
    console.warn = oldWarn
  })

  it('should call console.warn when value is not found', () => {
    const oldWarn = console.warn
    console.warn = jest.fn()
    __DEV__ = false
    getOrThrow(testRootObj, 'test.foo.3')

    expect(console.warn).toHaveBeenCalled()

    __DEV__ = true
    console.warn = oldWarn
  })

  it('should throw when __DEV__ is true and no value is found', () => {
    __DEV__ = true

    expect(() => {
      getOrThrow(testRootObj, 'test.foo.3')
    }).toThrow()
    expect(() => {
      getOrThrow(testRootObj, 'test.foo.3', null)
    }).toThrow()
  })
})
