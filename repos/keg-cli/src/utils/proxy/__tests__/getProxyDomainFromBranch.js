const currentBranchMocks = {
  'keg-core': `add-plugin`,
  'keg-components': `new-component`,
  'tap-test': `tap-feature`,
}
const currentMock = jest.fn((data) => {
  return { name: currentBranchMocks[data.location] }
})
jest.setMock('KegGitCli', { git: { branch: { current: currentMock }}})

const throwNoGitBranchMock = jest.fn()
jest.setMock('../../error/throwNoGitBranch', { throwNoGitBranch: throwNoGitBranchMock })

const { getProxyDomainFromBranch } = require('../getProxyDomainFromBranch')

describe('getProxyDomainFromBranch', () => {

  beforeEach(() => {
    currentMock.mockClear()
    throwNoGitBranchMock.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('Should return the correct proxyDomain for keg-core', async () => {
    expect(currentMock).not.toHaveBeenCalled()
    const proxyDomain = await getProxyDomainFromBranch('keg-core', 'keg-core')
    expect(proxyDomain).toBe(`keg-core-${currentBranchMocks['keg-core']}`)
    expect(currentMock).toHaveBeenCalled()
  })

  it('Should return the correct proxyDomain for keg-components', async () => {
    expect(currentMock).not.toHaveBeenCalled()
    const proxyDomain = await getProxyDomainFromBranch('keg-components', 'keg-components')
    expect(proxyDomain).toBe(`keg-components-${currentBranchMocks['keg-components']}`)
    expect(currentMock).toHaveBeenCalled()
  })

  it('Should return the correct proxyDomain for a tap', async () => {
    expect(currentMock).not.toHaveBeenCalled()
    const proxyDomain = await getProxyDomainFromBranch('tap-test', 'tap-test')
    expect(proxyDomain).toBe(`tap-test-${currentBranchMocks['tap-test']}`)
    expect(currentMock).toHaveBeenCalled()
  })

  it('Should throw when no branch can be found', async () => {
    expect(currentMock).not.toHaveBeenCalled()
    const proxyDomain = await getProxyDomainFromBranch('no-branch', 'no-branch')
    expect(throwNoGitBranchMock).toHaveBeenCalled()
    expect(currentMock).toHaveBeenCalled()
  })

})
