jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { cssToJs } = require('../cssToJs')
const { addToDom } = require('../addToDom')
addToDom(`.test-in-callback-1 {color:#111;}`)
addToDom(`.test-class-skipped {float:right;}`)
addToDom(`.test-selector .test-no-callback {flex:1;}`)
addToDom(`.test-in-callback-2 .test-no-callback {align:right;}`)

const mockAddToDom = jest.fn()

jest.setMock('../addToDom', { addToDom: mockAddToDom })

const testClassNames = [
  '.test-in-callback-1',
  '.test-no-callback',
  '.test-in-callback-2',
]

let mockFormatted = { cssRules: [], rootSelectors: [], asStr: '.test-string {}' }
const mockCallback = jest.fn((cssRule, rootSelector, formatted, cssToJs) => {
  if(formatted !== mockFormatted) formatted = mockFormatted

  formatted.cssRules.push(cssRule)
  formatted.rootSelectors.push(rootSelector)

  return formatted
})


const { styleSheetParser } = require('../styleSheetParser')

describe('styleSheetParser', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the passed in callback matching root classes in dom styleSheets', () => {
    const callback = jest.fn()
    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: callback,
      classNames: testClassNames,
    })

    expect(callback).toHaveBeenCalledTimes(2)

  })

  it('should not call the callback when a class exists, but it not the root', () => {
    const callback = jest.fn()
    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: callback,
      classNames: testClassNames,
    })

    callback.mock.calls.map(call => expect(call[1].indexOf(`test-no-callback`)).toBe(-1))

  })

  it('should call the callback for matching root selectors', () => {
    const callback = jest.fn()
    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: callback,
      classNames: testClassNames,
    })

    callback.mock.calls.map(call => {
      expect(call[1].indexOf('.test-in-callback')).toBe(0)
    })

  })

  it('should pass the css style rule to the callback', () => {
    const callback = jest.fn()
    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: callback,
      classNames: testClassNames,
    })

    callback.mock.calls.map(call => {
      expect(call[0].constructor.name).toBe('CSSStyleRule')
      expect(call[0].style.constructor.name).toBe('CSSStyleDeclaration')
    })

  })

  it('should pass a css to js helper function to the callback', () => {
    const callback = jest.fn()
    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: callback,
      classNames: testClassNames,
    })

    callback.mock.calls.map(call => {
      expect(typeof call[3]).toBe('function')
      expect(call[3]).toBe(cssToJs)
    })

  })

  it('should pass the response from each callback to the next callback', () => {

    const response = styleSheetParser({
      format: 'json',
      toDom: false,
      callback: mockCallback,
      classNames: testClassNames,
    })

    expect(response).toBe(mockFormatted)

  })

  it('should call addToDom when toDom is true', () => {
    mockAddToDom.mockClear()

    expect(mockAddToDom).not.toHaveBeenCalled()

    styleSheetParser({
      format: 'json',
      toDom: true,
      callback: mockCallback,
      classNames: testClassNames,
    })

    expect(mockAddToDom).toHaveBeenCalled()

  })

  it('should not call addToDom when toDom is false', () => {
    mockAddToDom.mockClear()

    expect(mockAddToDom).not.toHaveBeenCalled()

    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: mockCallback,
      classNames: testClassNames,
    })

    expect(mockAddToDom).not.toHaveBeenCalled()

  })


})