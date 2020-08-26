const { getRemotePath } = require('../getRemotePath')

describe('getRemotePath', () => {

  afterAll(() => jest.resetAllMocks())

  it('should get the remote path from the remote when passed in', async () => {
    const remotePath = getRemotePath('test', 'foo.bar', 'remote-path-test')
    expect(remotePath).toBe('remote-path-test')
  })

  it('should get the remote path from the context and dependency', async () => {
    const remotePath = getRemotePath('core', 'components')
    expect(remotePath).toBe('/keg/keg-core/node_modules/@simpleviewinc/keg-components')
  })

  it('should return undefined when no path is found', async () => {
    const remotePath = getRemotePath('core', 'foo')
    expect(remotePath).toBe(undefined)
  })

})
