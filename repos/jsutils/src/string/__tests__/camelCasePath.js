import { camelCasePath } from '../camelCasePath'
describe('camelCasePath', () => {
  it('should return a camelCased string from a path with >1 step', () => {
    const path = 'foo.bar.baz'
    const result = camelCasePath(path)
    expect(result).toEqual('fooBarBaz')
  })

  it ('should return the path unmodified when the path has only 1 step', () => {
    const path = 'foo'
    const result = camelCasePath(path)
    expect(result).toEqual('foo')
  })

  it ('should work with multi-step paths that have pre-camel-cased steps', () => {
    const path = 'foo.barBaz.Biz'
    const result = camelCasePath(path)
    expect(result).toEqual('fooBarBazBiz')
  })
})