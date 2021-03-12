const { tryRequire, tryRequireSync } = require('../tryRequire')
const path = require('path')

describe('tryRequireSync', () => {
  it('should return null for paths that export no module', () => {
    const result = tryRequireSync('./non/existent/path')
    expect(result).toEqual(null)
  })

  it('should require modules that do exist', () => {
    const module = tryRequireSync(path.resolve(__dirname, '../tryRequire.js'))
    expect(module).toEqual(
      expect.objectContaining({ tryRequireSync })
    )
  })
})

describe('tryRequire', () => {
  it('should return null for paths that export no module', async () => {
    const result = await tryRequire('./non/existent/path')
    expect(result).toEqual(null)
  })

  it('should require modules that do exist', async () => {
    const module = await tryRequire(path.resolve(__dirname, '../tryRequire.js'))
    expect(module).toEqual(
      expect.objectContaining({ tryRequireSync })
    )
  })
})