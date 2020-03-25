const Str = require('../')

describe('wordCaps', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should capitalize each word of a string', () => {
    expect(Str.wordCaps('i should be capitalized'))
      .toEqual('I Should Be Capitalized')
  })

  it('should make all chars lowercase except the first', () => {
    expect(Str.wordCaps('i shOuld bE caPitalized'))
      .toEqual('I Should Be Capitalized')
  })

})
