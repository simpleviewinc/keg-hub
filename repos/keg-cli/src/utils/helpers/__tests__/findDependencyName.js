
const { findDependencyName } = require('../findDependencyName')

describe('findDependencyName', () => {

  it('should return the value after the last /', () => {
    const dependency = '/my/dep/name/test'
    expect(findDependencyName(dependency)).toBe('/my/dep/name/test')
  })

  it('should use the remotePath, when dependency is undefined', () => {
    const remotePath = '/my/dep/name/test'
    expect(findDependencyName(null, remotePath)).toBe('test')
  })

  it('should remove the first underscore within the remotePath name', () => {
    const remotePath = '/my/dep/name/testRemove'
    expect(findDependencyName(null, remotePath)).toBe('testRemove')
  })

  it('should remove the first hyphen within the remotePath name', () => {
    const remotePath = '/my/dep/name/testRemove'
    expect(findDependencyName(null, remotePath)).toBe('testRemove')
  })

})
