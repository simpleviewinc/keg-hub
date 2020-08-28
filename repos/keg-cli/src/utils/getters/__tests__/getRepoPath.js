const { deepClone } = require('@svkeg/jsutils')

const orgGlobalConfig = global.getGlobalCliConfig()
const globalConfig = deepClone(orgGlobalConfig)

const { getRepoPath } = require('../getRepoPath')
const fakeTapPath = 'fake/tap/path'

const originalComponentsPath = orgGlobalConfig.cli.paths.components
const testComponentsPath = 'test/components/path'
globalConfig.cli.paths = {
  ...globalConfig.cli.paths,
  components: testComponentsPath
}

globalConfig.cli.taps.links = {
  ...globalConfig.cli.taps.links,
  fake: fakeTapPath,
}

describe('getRepoPath', () => {

  afterAll(() => jest.resetAllMocks())

  it('should get the repo path from the repo when passed in', () => {
    expect(getRepoPath('cli')).toBe(globalConfig.cli.paths.cli)
    expect(getRepoPath('core')).toBe(globalConfig.cli.paths.core)
  })

  it('should accept a globalConfig as the second argument', () => {
    expect(getRepoPath('components')).toBe(originalComponentsPath)
    expect(getRepoPath('components', globalConfig)).toBe(testComponentsPath)
  })

  it('should return undefined when no repo name is passed in', () => {
    expect(getRepoPath()).toBe(undefined)
  })

  it('should return undefined when the path can not be found', () => {
    expect(getRepoPath('foo-bar')).toBe(undefined)
  })

  it('should work with linked tap paths', () => {
    expect(getRepoPath('fake', globalConfig)).toBe(fakeTapPath)
  })

})
