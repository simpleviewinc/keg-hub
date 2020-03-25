const Str = require('../')

describe('mapString', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should map each character', () => {
    const result = Str.mapString(
      'test',
      c => c === 's' ? 'x' : c
    )
    expect(result).toEqual('text')
  })

})
