const Str = require('../')

describe('plural', () => {

  beforeEach(() => jest.resetAllMocks())

  it('adds s to word not ending in s', () => {
    expect(Str.plural('string')).toEqual('strings')
  })

  it('does not add s to word ending in s', () => {
    expect(Str.plural('strings')).toEqual('strings')
  })

})
