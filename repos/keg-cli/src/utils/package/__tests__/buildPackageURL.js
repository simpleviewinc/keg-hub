const { deepMerge, deepClone, validate, isStr, isObj, get } = require('@svkeg/jsutils')
const globalConfig = require('KegMocks/helpers/globalConfig')

const validateMock = jest.fn((...args) => validate(...args))
jest.setMock('@svkeg/jsutils', {
  deepMerge,
  deepClone,
  validate: validateMock,
  isStr,
  isObj,
  get
})

const options = {
  version: '0.1.1',
  globalConfig: globalConfig,
  branch: 'test-branch',
  package: {
    image: 'test-image',
    repo: 'test-repo',
    owner: 'test-owner'
  },
  provider: 'github'
}

const { buildPackageURL } = require('../buildPackageURL')

describe('buildPackageURL', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return a valid package url', () => {

    const packageUrl = buildPackageURL(options)

    expect(packageUrl).toBe('github/test-owner/test-repo/test-image:0.1.1')

  })

  it('should use the branch name when no version is passed', () => {

    const opts = deepClone(options)
    delete opts.version
    const packageUrl = buildPackageURL(opts)

    expect(packageUrl).toBe('github/test-owner/test-repo/test-image:test-branch')

  })

  it('should use the globalConfig cli git org name when no owner is passed', () => {

    const opts = deepClone(options)
    delete opts.package.owner
    opts.globalConfig.cli.git.orgName = 'org-fallback'
    const packageUrl = buildPackageURL(opts)

    expect(packageUrl).toBe('github/org-fallback/test-repo/test-image:0.1.1')

  })

  it('should call the validate method on the passed in options', () => {

    const packageUrl = buildPackageURL(options)

    expect(validateMock).toHaveBeenCalled()

  })

})