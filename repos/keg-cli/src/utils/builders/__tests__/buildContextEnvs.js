
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { buildContextEnvs } = require('../buildContextEnvs')

describe('buildContextEnvs', () => {

  afterAll(() => jest.resetAllMocks())
  
  it('Should build the container context envs for the base container', async () => {

    const contextEnvs = await buildContextEnvs({
        globalConfig,
        params: { context: 'base' },
        task: testTask,
        envs: {},
        cmdContext: 'base',
        tap: false
      })
      
      expect(contextEnvs.KEG_CONTEXT_PATH
        .indexOf('/keg-hub'))
        .not.toBe(-1)

      expect(contextEnvs.KEG_DOCKER_FILE
        .indexOf('/keg-hub/repos/keg-cli/containers/base/Dockerfile'))
        .not.toBe(-1)

      expect(contextEnvs.KEG_VALUES_FILE
        .indexOf('/keg-hub/repos/keg-cli/containers/base/values.yml'))
        .not.toBe(-1)

      expect(contextEnvs.KEG_COMPOSE_DEFAULT
        .indexOf('/keg-hub/repos/keg-cli/containers/base/docker-compose.yml'))
        .not.toBe(-1)

      expect(contextEnvs.IMAGE).toBe('keg-base')
      expect(contextEnvs.VERSION).toBe('0.0.1')
      expect(contextEnvs.CONTAINER_NAME).toBe('keg-base')

    })

})