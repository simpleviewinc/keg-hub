const Obj = require('../')

describe('sanitizeCopy', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should strip html from object properties', () => {
    const dirtyObject = {
      name: 'Test name',
      text: '<p>This is the dirty string</p>'
    }
    const cleanText = '&lt;p&gt;This is the dirty string&lt;/p&gt;'
    const cleanObject = Obj.sanitizeCopy(dirtyObject)

    expect(cleanObject).not.toEqual(dirtyObject)
    expect(cleanObject.name).toEqual(dirtyObject.name)
    expect(cleanObject.text).toEqual(cleanText)
  })
})