const Str = require('../')

describe('isUrl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if some data is a url string', () => {
    const amValid1 = 'www.test.com'
    const amValid2 = 'test.com'
    const amValid3 = 'https://pass.com'
    const amValid4 = 'http://www.pass.com'
    const notValid1 = {}
    const notValid2 = 'test'
    const notValid3 = 'https://fail'

    expect(Str.isUrl(amValid1)).toEqual(true)
    expect(Str.isUrl(amValid2)).toEqual(true)
    expect(Str.isUrl(amValid3)).toEqual(true)
    expect(Str.isUrl(amValid4)).toEqual(true)
    
    expect(Str.isUrl(notValid1)).toEqual(false)
    expect(Str.isUrl(notValid2)).toEqual(false)
    expect(Str.isUrl(notValid3)).toEqual(false)

  })

})
