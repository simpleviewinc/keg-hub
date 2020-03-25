const Str = require('../')

describe('clean', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should clean a string by removing _ and -', () => {
    expect(Str.cleanStr('STRING_CLEAN-DASH')).toEqual('STRING CLEAN DASH')
  })

})
