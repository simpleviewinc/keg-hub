jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { getCssSelector } = require('../getCssSelector')
const config = { 
  prefix: 'test',
  format: `[data-class~="{{ selector }}"]`,
}

describe('getCssSelector', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should convert selector that match the passed in prefix', () => {

    expect(getCssSelector({ ...config, selector: 'test-class' }))
      .toBe(`[data-class~="test-class"]`)

    expect(getCssSelector({ ...config, selector: 'test-id' }))
      .toBe(`[data-class~="test-id"]`)

    expect(getCssSelector({ ...config, selector: 'test-data-attr' }))
      .toBe(`[data-class~="test-data-attr"]`)

  })

  it('should NOT convert passed in selectors that are already a css selector', () => {

    expect(getCssSelector({ ...config, selector: '.test-class' })).toBe('.test-class')
    expect(getCssSelector({ ...config, selector: '#test-id' })).toBe('#test-id')
    expect(getCssSelector({ ...config, selector: '[test-data-attr]' })).toBe('[test-data-attr]')

  })

  it('should NOT convert selectors that do not match the prefix', () => {

    expect(getCssSelector({ ...config, selector: 'foo-class' })).toBe('foo-class')
    expect(getCssSelector({ ...config, selector: 'boo-id' })).toBe('boo-id')
    expect(getCssSelector({ ...config, selector: 'bar-data-attr' })).toBe('bar-data-attr')

  })

  it('should convert all selectors when no prefix exists', () => {

    const conf = { format: `[data-class~="{{ selector }}"]` }

    expect(getCssSelector({ ...conf, selector: 'foo-class' }))
      .toBe(`[data-class~="foo-class"]`)

    expect(getCssSelector({ ...conf, selector: 'boo-id' }))
      .toBe(`[data-class~="boo-id"]`)

    expect(getCssSelector({ ...conf, selector: 'bar-data-attr' }))
      .toBe(`[data-class~="bar-data-attr"]`)

  })


})
