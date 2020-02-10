const { options } = require('../../mocks')

// Module to test
const { validateBabel } = require('../validateBabel')

describe('validateBabel', () => {
  
  beforeEach(() => {})

  it('should not throw when valid params are passed in', () => {
    expect(() => { validateBabel(options) }).not.toThrow()
  })

  it('should throw when tapPath is not a string or does not exist', () => {

    const { tapPath, ...optsCopy } = options

    expect(() => { validateBabel({ ...optsCopy }) }).toThrow()
    expect(() => { validateBabel({ ...options, tapPath: null }) }).toThrow()
    expect(() => { validateBabel({ ...options, tapPath: [] }) }).toThrow()
    expect(() => { validateBabel({ ...options, tapPath: {} }) }).toThrow()
    expect(() => { validateBabel({ ...options, tapPath: false }) }).toThrow()

  })

  it('should throw when kegPath is not a string or does not exist', () => {

    const { kegPath, ...optsCopy } = options

    expect(() => { validateBabel({ ...optsCopy }) }).toThrow()
    expect(() => { validateBabel({ ...options, kegPath: null }) }).toThrow()
    expect(() => { validateBabel({ ...options, kegPath: [] }) }).toThrow()
    expect(() => { validateBabel({ ...options, kegPath: {} }) }).toThrow()
    expect(() => { validateBabel({ ...options, kegPath: false }) }).toThrow()

  })

  it('should throw when config is not a object or does not exist', () => {

    const { config, ...optsCopy } = options

    expect(() => { validateBabel({ ...optsCopy }) }).toThrow()
    expect(() => { validateBabel({ ...options, config: null }) }).toThrow()
    expect(() => { validateBabel({ ...options, config: [] }) }).toThrow()
    expect(() => { validateBabel({ ...options, config: '' }) }).toThrow()
    expect(() => { validateBabel({ ...options, config: false }) }).toThrow()

  })

})
