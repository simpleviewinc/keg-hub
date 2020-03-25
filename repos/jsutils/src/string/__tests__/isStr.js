const Str = require('../')

describe('isStr', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if some data is a string', () => {
    const amString = 'I am a string'
    const notString = {}

    expect(Str.isStr(amString)).toEqual(true)
    expect(Str.isStr(notString)).toEqual(false)

  })

})
