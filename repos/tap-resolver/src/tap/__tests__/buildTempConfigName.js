const { buildTempConfigName } = require('../buildTempConfigName')
const { configNames } = require('../tapConstants.js')
const path = require('path')

describe('buildTempConfigFileName', () => {
  it('should throw if source is invalid', () => {
    expect(() => buildTempConfigName(Symbol())).toThrow(
      /Incorrect App config file name/
    )
    expect(() => buildTempConfigName(configNames[0] + 'xyz')).toThrow(
      /Incorrect App config file name/
    )
  })

  it('should return the source file name, but with the json extension', () => {
    configNames.map(name => {
      const result = buildTempConfigName(name)
      const sourceParts = path.parse(name)
      const resultParts = path.parse(result)
      expect(sourceParts.name).toEqual(resultParts.name)
      expect(resultParts.ext).toEqual('.json')
    })
  })
})
