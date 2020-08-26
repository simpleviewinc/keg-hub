const { DOCKER } = require('KegConst/docker')
const { CONTAINER_TO_CONTEXT } = require('KegConst/constants')

const { getKegContext } = require('../getKegContext')

describe('getKegContext', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return the context without the keg prefix', async () => {

    expect(getKegContext('keg-core')).toBe('core')
    expect(getKegContext('keg-components')).toBe('components')
    expect(getKegContext('kegcomponents')).toBe('components')

  })

  it('should note remove the keg context if the context in not in CONTAINER_TO_CONTEXT', async () => {

    const contextKeys = Object.keys(CONTAINER_TO_CONTEXT)
    
    expect(contextKeys.indexOf('keg-core')).not.toBe(-1)
    expect(getKegContext('keg-core')).toBe('core')
    expect(getKegContext('kegcore')).toBe('core')

    expect(contextKeys.indexOf('keg-duper')).toBe(-1)
    expect(getKegContext('keg-duper')).toBe('keg-duper')
    expect(getKegContext('kegduper')).toBe('kegduper')

  })

  it('should return the context without the keg prefix when a custom context is injected', async () => {

    const { injectContainer } = require('KegConst/docker/containers')
    injectContainer('duper', 'test', {})

    expect(getKegContext('keg-duper')).toBe('duper')
    expect(getKegContext('kegduper')).toBe('duper')

  })


})