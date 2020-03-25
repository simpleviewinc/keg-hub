const Str = require('../')

describe('sanitize', () => {

  beforeEach(() => jest.resetAllMocks())
  it('should strip html from string', () => {
    const dirty = '<p>This is the dirty string</p>'
    const clean = '&lt;p&gt;This is the dirty string&lt;/p&gt;'
    const cleaned = Str.sanitize(dirty)

    expect(cleaned).toEqual(clean)

  })

})
