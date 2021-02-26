const { tryRequire } = require('../tryRequire')
const path = require('path')

describe('tryRequire', () => {
  it('should return null for paths that export no module', () => {
    const result = tryRequire('./non/existent/path')
    expect(result).toEqual(null)
  })

  it('should require modules that do exist', () => {
    const module = tryRequire(path.resolve(__dirname, '../tryRequire.js'))
    expect(module).toEqual(
      expect.objectContaining({ tryRequire })
    )
  })
})