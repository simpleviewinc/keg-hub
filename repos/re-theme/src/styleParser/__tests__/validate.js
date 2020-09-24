jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

let mockDomAccess = true
const mockHasDomAccess = jest.fn(() => mockDomAccess)
jest.setMock('../../helpers/hasDomAccess', { hasDomAccess: mockHasDomAccess })

const testClassNames = [
  '.test-in-callback-1',
  '.test-no-callback',
  '.test-in-callback-2',
]

const { validateArguments } = require('../validate')

describe('validateArguments', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('return the passed in args when it containers a classNames array and callback', () => {
    const args = { classNames: testClassNames, callback: jest.fn() }
    expect(validateArguments(args)).toBe(args)
  })

  it('returns an object with valid false when no classNames is not an array', () => {
    const oldError = console.error
    console.error = jest.fn()

    const args = { classNames: {}, callback: jest.fn() }
    expect(validateArguments(args).valid).toBe(false)

    const args1 = { classNames: '', callback: jest.fn() }
    expect(validateArguments(args1).valid).toBe(false)

    const args2 = { classNames: 0, callback: jest.fn() }
    expect(validateArguments(args2).valid).toBe(false)

    console.error = oldError
  })

  it('returns an object with valid false when callback is not a function', () => {
    const oldError = console.error
    console.error = jest.fn()

    const args = { classNames: [], callback: [] }
    expect(validateArguments(args).valid).toBe(false)

    const args1 = { classNames: [], callback: 0 }
    expect(validateArguments(args1).valid).toBe(false)

    const args2 = { classNames: [], callback: '' }
    expect(validateArguments(args2).valid).toBe(false)
    
    console.error = oldError
  })

  it('return an object with valid false when domAccess is false', () => {
    const oldError = console.error
    console.error = jest.fn()

    mockDomAccess = false
    const args = { classNames: testClassNames, callback: jest.fn() }
    expect(validateArguments(args).valid).toBe(false)
    
    console.error = oldError
  })

})
