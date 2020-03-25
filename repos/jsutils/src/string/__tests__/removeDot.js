const Str = require('../')

describe('removeDot', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should remove . from start and end of a string', () => {
    expect(Str.removeDot('.string.')).toEqual('string')
    expect(Str.removeDot('.string')).toEqual('string')
    expect(Str.removeDot('string.')).toEqual('string')
  })

  it('does change a string with not dots', () => {
    expect(Str.removeDot('string')).toEqual('string')
  })

})
