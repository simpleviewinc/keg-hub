const { get } = require('@svkeg/jsutils')

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const themeStyles = {
  main: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: '#22B3C4',
  },
  content: {
    title: {
      alignSelf: 'center',
      paddingLeft: 46,
    },
    button: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      right: '4%',
    },
  },
}

const webClass = 'web-test-root-class'
const webDataSetProp = [
  { hash: [] }, // web
  themeStyles, // cssProps
  {}, // custom style
  { 
    selector: webClass,
    prefix: 'web',
    format: `[data-class~="{{ selector }}"]`,
  }, // config
]

const nativeClass = 'native-test-root-class'
const nativeDataSetProp = [
  false, // web
  themeStyles, // cssProps
  {}, // custom style
  {
    selector: nativeClass,
    prefix: 'native',
    format: `[data-class~="{{ selector }}"]`,
  }, // config
]

const { generateDataSet } = require('../generateDataSet')

describe('generateDataSet', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should build dataSet-class props web', () => {

    const built = generateDataSet(...webDataSetProp)

    const mainClass = get(built, 'cssProps.main.dataSet.class')
    const titleClass = get(built, 'cssProps.content.title.dataSet.class')
    const buttonClass = get(built, 'cssProps.content.button.dataSet.class')

    expect(mainClass).toBe(`${webClass}-main`)
    expect(titleClass).toBe(`${webClass}-content-title`)
    expect(buttonClass).toBe(`${webClass}-content-button`)

  })

  it('should NOT build style props for web', () => {

    const built = generateDataSet(...webDataSetProp)

    const mainStyle = get(built, 'cssProps.main.style')
    const titleStyle = get(built, 'cssProps.content.title.style')
    const buttonStyle = get(built, 'cssProps.content.button.style')

    expect(mainStyle).toBe(undefined)
    expect(titleStyle).toBe(undefined)
    expect(buttonStyle).toBe(undefined)

  })

  it('should build web styles props on web', () => {

    const built = generateDataSet(...webDataSetProp)
    const webStyle = get(built, 'web.styles')

    expect(typeof webStyle).toBe('object')

  })

  it('should convert the data-set class values to data-attribute selectors', () => {

    const built = generateDataSet(...webDataSetProp)
    const webStyle = get(built, 'web.styles')
    const mainStyle = webStyle[`[data-class~=\"${webClass}-main\"]`]
    const titleStyle = webStyle[`[data-class~=\"${webClass}-content-title\"]`]
    const buttonStyle = webStyle[`[data-class~=\"${webClass}-content-button\"]`]
    
    expect(typeof mainStyle).toBe('object')
    expect(mainStyle.flexDirection).toBe(themeStyles.main.flexDirection)
    expect(mainStyle.height).toBe(themeStyles.main.height)
    expect(mainStyle.backgroundColor).toBe(themeStyles.main.backgroundColor)

    expect(typeof titleStyle).toBe('object')
    expect(titleStyle.alignSelf).toBe(themeStyles.content.title.alignSelf)
    expect(titleStyle.paddingLeft).toBe(themeStyles.content.title.paddingLeft)

    expect(typeof buttonStyle).toBe('object')
    expect(buttonStyle.flexDirection).toBe(themeStyles.content.button.flexDirection)
    expect(buttonStyle.alignItems).toBe(themeStyles.content.button.alignItems)
    expect(buttonStyle.right).toBe(themeStyles.content.button.right)

  })

  it('should build the correct props for native', () => {

    const built = generateDataSet(...nativeDataSetProp)

    const mainStyle = get(built, 'cssProps.main.style')
    const mainClass = get(built, 'cssProps.main.dataSet.class')

    expect(mainStyle.flexDirection).toBe(themeStyles.main.flexDirection)
    expect(mainStyle.height).toBe(themeStyles.main.height)
    expect(mainStyle.backgroundColor).toBe(themeStyles.main.backgroundColor)
    expect(mainClass).toBe(`${nativeClass}-main`)

    const titleStyle = get(built, 'cssProps.content.title.style')
    const titleClass = get(built, 'cssProps.content.title.dataSet.class')

    expect(titleStyle.alignSelf).toBe(themeStyles.content.title.alignSelf)
    expect(titleStyle.paddingLeft).toBe(themeStyles.content.title.paddingLeft)
    expect(titleClass).toBe(`${nativeClass}-content-title`)

    const buttonStyle = get(built, 'cssProps.content.button.style')
    const buttonClass = get(built, 'cssProps.content.button.dataSet.class')

    expect(buttonStyle.flexDirection).toBe(themeStyles.content.button.flexDirection)
    expect(buttonStyle.alignItems).toBe(themeStyles.content.button.alignItems)
    expect(buttonStyle.right).toBe(themeStyles.content.button.right)
    expect(buttonClass).toBe(`${nativeClass}-content-button`)

  })

  it('should NOT build web styles for on native', () => {

    const built = generateDataSet(...nativeDataSetProp)
    expect(built.web).toBe(false)

  })

  it('should NOT build props for non-style-object', () => {

    const built = generateDataSet(...nativeDataSetProp)
    const contentStyle = get(built, 'cssProps.content.style')
    const contentClass = get(built, 'cssProps.content.dataSet')

    expect(contentStyle).toBe(undefined)
    expect(contentClass).toBe(undefined)

  })

})
