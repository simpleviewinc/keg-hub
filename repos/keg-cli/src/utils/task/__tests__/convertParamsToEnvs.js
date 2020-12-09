const { deepClone, isObj } = require('@keg-hub/jsutils')

const defArgs = { env: 'development', command: 'run', install: true, local: true }
const contextEnv = { KEG_FOO: 'BAR', KEG_BAZ: 'BAS' }

const { convertParamsToEnvs } = require('../convertParamsToEnvs')

describe('convertParamsToEnvs', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return an object of ENVs based off params', () => {

    const converted = convertParamsToEnvs(defArgs)

    expect(isObj(converted)).toBe(true)
    expect(converted.NODE_ENV).toBe('development')
    expect(converted.KEG_EXEC_CMD).toBe('run')
    expect(converted.KEG_NM_INSTALL).toBe(true)
    expect(converted.KEG_COPY_LOCAL).toBe(true)
    
    const converted2 = convertParamsToEnvs({
      ...defArgs,
      install: false,
      command: 'duper'
    })

    expect(converted2.KEG_NM_INSTALL).toBe(undefined)
    expect(converted2.KEG_EXEC_CMD).toBe('duper')

  })

  // TODO: add tests for copyLocal logic


})
