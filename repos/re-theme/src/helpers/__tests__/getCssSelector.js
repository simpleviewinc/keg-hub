jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { getCssSelector } = require('../getCssSelector')
const config = { 
  prefix: 'test',
  selector: `[data-class~="{{ selector }}"]`,
}

describe('getCssSelector', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should convert classNames that match the passed in prefix', () => {

    const conf = { selector: `[data-class~="{{ selector }}"]` }

    expect(getCssSelector({ ...config, className: 'test-class' }))
      .toBe(`[data-class~="test-class"]`)

    expect(getCssSelector({ ...config, className: 'test-id' }))
      .toBe(`[data-class~="test-id"]`)

    expect(getCssSelector({ ...config, className: 'test-data-attr' }))
      .toBe(`[data-class~="test-data-attr"]`)

  })

  it('should NOT convert passed in classNames that are already a css selector', () => {

    expect(getCssSelector({ ...config, className: '.test-class' })).toBe('.test-class')
    expect(getCssSelector({ ...config, className: '#test-id' })).toBe('#test-id')
    expect(getCssSelector({ ...config, className: '[test-data-attr]' })).toBe('[test-data-attr]')

  })

  it('should NOT convert classNames that do not match the prefix', () => {

    expect(getCssSelector({ ...config, className: 'foo-class' })).toBe('foo-class')
    expect(getCssSelector({ ...config, className: 'boo-id' })).toBe('boo-id')
    expect(getCssSelector({ ...config, className: 'bar-data-attr' })).toBe('bar-data-attr')

  })

  it('should convert all classNames when no prefix exists', () => {

    const conf = { selector: `[data-class~="{{ selector }}"]` }

    expect(getCssSelector({ ...conf, className: 'foo-class' }))
      .toBe(`[data-class~="foo-class"]`)

    expect(getCssSelector({ ...conf, className: 'boo-id' }))
      .toBe(`[data-class~="boo-id"]`)

    expect(getCssSelector({ ...conf, className: 'bar-data-attr' }))
      .toBe(`[data-class~="bar-data-attr"]`)

  })


})
