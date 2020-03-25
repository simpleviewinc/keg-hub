const Str = require('../')

describe('isPhone', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if some data is a phone number string', () => {
    const amValid1 = '1231231234'
    const amValid2 = '123-123-1234'
    const notValid1 = {}
    const notValid2 = '1w2123123R'
    const notValid3 = '623-123-12345'

    expect(Str.isPhone(amValid1)).toEqual(true)
    expect(Str.isPhone(amValid2)).toEqual(true)
    expect(Str.isPhone(notValid1)).toEqual(false)
    expect(Str.isPhone(notValid2)).toEqual(false)
    expect(Str.isPhone(notValid3)).toEqual(false)

  })

})
