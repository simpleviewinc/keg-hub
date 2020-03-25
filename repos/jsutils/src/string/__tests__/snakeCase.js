const Str = require('../')

describe('snakeCase', () => {

  beforeEach(() => jest.resetAllMocks())

  const cases = [
    'fooBar',
    'foo_bar',
    'FOO_BAR',
    'FooBar',
    'FooBAR',
    'foo-bar',
    'foo-BAR',
    'Foo-Bar',
    'FOO-BAR',
    'Foo Bar',
    'foo bar',
  ]
  
  cases.map(str => {
    it(`should convert ${str} to snake case`, () => {
      const result = Str.snakeCase(str)
      expect(result).toEqual('foo_bar')
    }) 
  })

  it('should leave a single word unchanged', () => {
    const word = 'foo'
    expect(Str.snakeCase(word)).toEqual('foo')
  })

})
