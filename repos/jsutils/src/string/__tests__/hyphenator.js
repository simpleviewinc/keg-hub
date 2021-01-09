const { hyphenator } = require('../')

describe('hyphenator', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should hyphenate the passed in string', () => {
    expect(hyphenator(`marginTop`)).toBe(`margin-top`)
    expect(hyphenator(`backgroundColor`)).toBe(`background-color`)
    expect(hyphenator(`borderTopLeftRadius`)).toBe(`border-top-left-radius`)
    expect(hyphenator(`someTestString`)).toBe(`some-test-string`)
  })

  it('should not fail on pre-hyphenated strings', () => {
    expect(hyphenator(`some-test-string`)).toBe(`some-test-string`)
  })

  it('should add a - to the front then string starts with ms-', () => {
    expect(hyphenator(`msTestString`)).toBe(`-ms-test-string`)
  })

})