
const globalConfig = global.getGlobalCliConfig()
const { getLocalPath } = require('../getLocalPath')

describe('getLocalPath', () => {

  afterAll(() => jest.resetAllMocks())

  it('should get the local path from the local when passed in', async () => {

    const localPath = getLocalPath(globalConfig, 'test', 'foo.bar', 'local-path-test')
    expect(localPath).toBe('local-path-test')

  })

  it('should get the local path from the context and dependency', async () => {

    const localPath = getLocalPath(globalConfig, 'core', 'cli')
    expect(localPath).toBe(globalConfig.cli.paths.cli)

  })

  it('should return the current working directory when no path is found', async () => {
    const cwd = process.cwd()
    const localPath = getLocalPath(globalConfig, 'core', 'foo')
    expect(localPath).toBe(cwd)

  })

})
