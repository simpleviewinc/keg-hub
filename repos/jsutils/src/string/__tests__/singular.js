const Str = require('../')

describe('singular', () => {

  beforeEach(() => jest.resetAllMocks())
  it('removes s from word ending in s', () => {
    expect(Str.singular('strings')).toEqual('string')
  })

  it('does not modify string not ending in s', () => {
    expect(Str.singular('string')).toEqual('string')
  })

})
