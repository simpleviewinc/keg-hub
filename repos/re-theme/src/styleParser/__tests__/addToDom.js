jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const orgCreateEl = document.createElement
const orgCreateText = document.createTextNode
const orgGetTagName = document.getElementsByTagName

const testCreateEl = jest.fn((...params) => {
  return orgCreateEl.call(document, ...params)
})

const testCreateText = jest.fn((...params) => {
  return orgCreateText.call(document, ...params)
})

const mockAppendChild = jest.fn(() => {})
const testGetTagName = jest.fn((...params) => {
  return [ { appendChild: mockAppendChild } ]
})

document.createElement = testCreateEl
document.createTextNode = testCreateText
document.getElementsByTagName = testGetTagName

const testStyles = '.my-test-class { color: blue; }'

const resetDocument = () => {
  document.createElement = orgCreateEl
  document.createTextNode = orgCreateText
  document.getElementsByTagName = orgGetTagName
}

let mockStyleEl

const buildTestStyleEl = (addStyleSheet=true) => {
  document.createElement = jest.fn((...params) => {
    mockStyleEl = { appendChild: jest.fn(() => {}) }
    addStyleSheet && ( mockStyleEl.styleSheet = { cssText: '' } )

    return mockStyleEl
  })
}

const { addToDom } = require('../addToDom')

describe('addToDom', () => {

  afterAll(() => {
    resetDocument()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new style element by calling createElement', () => {

    addToDom(testStyles)
    expect(testCreateEl).toHaveBeenCalledWith('style')

  })

  it('should NOT call appendChild when styleSheet exists', () => {

    buildTestStyleEl()

    addToDom(testStyles)
    expect(mockStyleEl.appendChild).not.toHaveBeenCalled()

  })

  it('should call appendChild when styleSheet does not exists', () => {

    expect(mockStyleEl.appendChild).not.toHaveBeenCalled()

    buildTestStyleEl(false)

    addToDom(testStyles)
    expect(mockStyleEl.appendChild).toHaveBeenCalled()

  })

  it('should call createTextNode when styleSheet does not exists', () => {

    expect(testCreateText).not.toHaveBeenCalled()

    buildTestStyleEl(false)

    addToDom(testStyles)
    expect(testCreateText).toHaveBeenCalled()

  })

  it('should call getElementsByTagName to get the head element', () => {

    expect(testGetTagName).not.toHaveBeenCalled()

    buildTestStyleEl(false)

    addToDom(testStyles)
    expect(testGetTagName).toHaveBeenCalled()

  })

  it('should call mockAppendChild on the found head element', () => {

    expect(mockAppendChild).not.toHaveBeenCalled()

    buildTestStyleEl(false)

    addToDom(testStyles)
    expect(mockAppendChild).toHaveBeenCalled()

  })

})
