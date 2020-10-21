const { deepClone } = require('@keg-hub/jsutils')
const orgGlobalConfig = global.getGlobalCliConfig()
const globalConfig = deepClone(orgGlobalConfig)

const { getPrefixContext } = require('../getPrefixContext')

describe('getPrefixContext', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return the context with and without the context', () => {
    const { context, noPrefix } = getPrefixContext('img-keg-core')

    expect(context).toBe('core')
    expect(noPrefix).toBe('keg-core')

  })

  it('should return the same for context and noPrefix when no prefix exists', () => {
    const { context, noPrefix } = getPrefixContext('foo')

    expect(context).toBe('foo')
    expect(noPrefix).toBe('foo')

  })

  it('should return the noPrefix with keg when its part of the passed in context', () => {
    const { context, noPrefix } = getPrefixContext('package-keg-components')

    expect(context).toBe('components')
    expect(noPrefix).toBe('keg-components')

  })

  it('should only remove keg from the context when its in the container map', () => {
    const { context, noPrefix } = getPrefixContext('package-keg-foo')

    expect(context).toBe('tap')
    expect(noPrefix).toBe('keg-foo')

  })

  it('should return the correct prefix context for taps', () => {
    const repImg = getPrefixContext('img-tap-test-container')
    const repPack = getPrefixContext('package-tap-test-container')

    expect(JSON.stringify(repImg)).toEqual(JSON.stringify({
      prefix: 'img',
      context: 'tap',
      withPrefix: 'img-tap-test-container',
      noPrefix: 'tap-test-container',
      tap: 'tap-test-container'
    }))

    expect(JSON.stringify(repPack)).toEqual(JSON.stringify({
      prefix: 'package',
      context: 'tap',
      withPrefix: 'package-tap-test-container',
      noPrefix: 'tap-test-container',
      tap: 'tap-test-container'
    }))

  })


})
