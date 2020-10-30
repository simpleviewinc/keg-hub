const { dockerLabels } = require('KegMocks/libs/docker/docker')
const globalConfig = global.getGlobalCliConfig()

const { getBuildLabels } = require('../getBuildLabels')

describe('getBuildLabels', () => {

  it('Should return the default labels when no labels are passed in for keg-base', () => {
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'base', tap: false })
    expect(labels).toBe(dockerLabels.base)
  })

  it('Should return the default labels when no labels are passed in for keg-core', () => {
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'core', tap: false })
    expect(labels).toBe(dockerLabels.core)
  })

  it('Should return the default labels when no labels are passed in for keg-components', () => {
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'components', tap: false })
    expect(labels).toBe(dockerLabels.components)
  })

  it('Should return the default labels when no labels are passed in for keg-proxy', () => {
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'proxy', tap: false })
    expect(labels).toBe(dockerLabels.proxy)
  })

  it('Should return the default labels when no labels are passed in for tap', () => {
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'tap', tap: 'test-tap' })
    expect(labels).toBe(dockerLabels.tap)
  })

  it('Should add extra labels when they are passed in as a string', () => {
    const addedLabels = `com.test.label="my-test-label",com.test.other="my-other-test-label"`
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'base', labels: addedLabels })

    expect(labels.indexOf(`--label com.test.label="my-test-label"`)).not.toBe(-1)
    expect(labels.indexOf(`--label com.test.other="my-other-test-label"`)).not.toBe(-1)
  })

  it('Should add extra labels when they are passed in as an array', () => {
    const addedLabels = [
      `com.test.label="my-test-label"`,
      `com.test.other="my-other-test-label"`
    ]
    const labels = getBuildLabels(globalConfig, { dockerCmd: '', context: 'base', labels: addedLabels })

    expect(labels.indexOf(`--label com.test.label="my-test-label"`)).not.toBe(-1)
    expect(labels.indexOf(`--label com.test.other="my-other-test-label"`)).not.toBe(-1)
  })

})