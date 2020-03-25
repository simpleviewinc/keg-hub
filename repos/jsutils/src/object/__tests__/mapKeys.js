const Obj = require('../')
const { snakeCase } = require('../../string/snakeCase')

describe('mapKeys', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should map all the keys of an object', () => {
    const obj = {
      'fooBar': 'wow',
      'PascalCase': 'whoa',
      'css-crap': 'hyphenated'
    }

    const result = Obj.mapKeys(obj, snakeCase)
    expect(result.foo_bar).toEqual(obj.fooBar)
    expect(result.pascal_case).toEqual(obj.PascalCase)
    expect(result.css_crap).toEqual(obj['css-crap'])
  })
})
