import { getCSSRules } from '../getCSSRules'

const mockValidSheet = {
  cssRules: [ 1, 2, 3 ]
}

const mockRestrictedSheet = {
  get cssRules () {
    throw new DOMException('DOMException Message', 'SecurityError')
  }
}

const mockExceptionSheet = {
  get cssRules () {
    throw new Error('GenericError')
  }
}

describe('getCSSRules', () => {
  const orig = console.warn

  beforeEach(() => {
    console.warn = jest.fn()
  })

  afterAll(() => {
    console.warn = orig
  })

  it('should return an empty array if the stylesheet is falsy', () => {
    const results = [ null, false, undefined, '', 0 ].map(getCSSRules)
    results.map(result => expect(result).toEqual([]))
    expect(console.warn).not.toBeCalled()
  })

  it('should simply cssRules for stylesheet without CORS', () => {
    const result = getCSSRules(mockValidSheet)
    expect(result).toEqual(mockValidSheet.cssRules)
    expect(console.warn).not.toBeCalled()
  })

  it ('should log warnings for restricted sheets', () => {
    const result = getCSSRules(mockRestrictedSheet)
    expect(result).toEqual([])
    const warningText = console.warn.mock.calls[0][0]
    expect(warningText).toEqual(expect.stringContaining('cross-origin'))
  })

  it ('should log warnings for other errors', () => {
    const result = getCSSRules(mockExceptionSheet)
    expect(result).toEqual([])
    const warningText = console.warn.mock.calls[0][2]
    expect(warningText).toEqual(expect.stringContaining('Reason: '))
  })

})