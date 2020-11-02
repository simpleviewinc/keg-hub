const { getProxyDomainFromBranch } = require('../getProxyDomainFromBranch')
const { DOCKER } = require('KegConst/docker')
const { dockerPackage, dockerProxyOpts } = require('KegMocks/libs/docker')

const buildArgs = () => {
  return {
    core: [
      [ '--option-core' ],
      { contextEnvs: DOCKER.CONTAINERS.CORE.ENV },
      dockerPackage.core,
    ],
    components: [
      [],
      { contextEnvs: DOCKER.CONTAINERS.COMPONENTS.ENV },
      dockerPackage.components,
    ],
    tap: [
      [ '--option-tap' ],
      { contextEnvs: DOCKER.CONTAINERS.TAP.ENV },
      dockerPackage.tap,
    ]
  }
  
}

describe('getProxyDomainFromBranch', () => {

  afterAll(() => jest.resetAllMocks())

  it('Should ', async () => {

  })


})
