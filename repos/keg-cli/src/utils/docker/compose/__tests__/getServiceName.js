const throwNoComposeMock = jest.fn()
jest.setMock('../../../error/throwNoComposeService', { throwNoComposeService: throwNoComposeMock })

const composeConfig = {
  services: {
    'keg-core': {},
    'some-other-service': {},
  }
}

const loadComposeMock = jest.fn(({ context }) => {
  return context === 'mockService'
    ? {
        ...composeConfig,
        services: {
          mockService: {},
          ...composeConfig.services,
        }
      }
    : false
})

jest.setMock('../loadComposeConfig', { loadComposeConfig: loadComposeMock })

const { getServiceName } = require('../getServiceName')

describe('getServiceName', () => {

  beforeEach(() => {
    throwNoComposeMock.mockClear()
    loadComposeMock.mockClear()
  })

  afterAll(() => jest.resetAllMocks())
  
  it('Should get the service name of the first service defined in the compose-config', async () => {
    expect(await getServiceName({ composeConfig })).toBe(`keg-core`)
    expect(await getServiceName({
      composeConfig: {
        ...composeConfig,
        services: {
          first: {},
          ...composeConfig.services
        }
      } 
    }))
    .toBe(`first`)
  })

  it('Should try to load the compose config when one is not passed in', async () => {
    expect(await getServiceName({ context: 'mockService' })).toBe(`mockService`)
    expect(loadComposeMock).toHaveBeenCalled()
  })

  it('Should call the no compose config error when compose config can not be loaded', async () => {
    await getServiceName({})
    expect(throwNoComposeMock).toHaveBeenCalled()
  })

  it('Should NOT call the no compose config error when skipThrow argument is passed', async () => {
    await getServiceName({ skipThrow: true })
    expect(throwNoComposeMock).not.toHaveBeenCalled()
  })

  it('Should return false when not config can be loaded', async () => {
    expect(await getServiceName({ skipThrow: true })).toBe(false)
  })

})