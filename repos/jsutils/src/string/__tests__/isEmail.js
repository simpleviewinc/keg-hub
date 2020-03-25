const Str = require('../')

describe('isEmail', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if some data is a email string', () => {
    const amValid1 = 'lt@test.com'
    const amValid2 = 's@e.co'
    const notValid1 = {}
    const notValid2 = 'failed$test.com'
    const notValid3 = 'failed@test'

    expect(Str.isEmail(amValid1)).toEqual(true)
    expect(Str.isEmail(amValid2)).toEqual(true)
    expect(Str.isEmail(notValid1)).toEqual(false)
    expect(Str.isEmail(notValid2)).toEqual(false)
    expect(Str.isEmail(notValid3)).toEqual(false)

  })

})
