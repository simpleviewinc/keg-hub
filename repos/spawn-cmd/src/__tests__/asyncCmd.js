const { limbo } = require('@keg-hub/jsutils')
const asyncCmd = require('../asyncCmd')
const path = require('path')

describe('/asyncCmd', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should return the stdout to data', async () => {

    const { error, data } = await asyncCmd('echo test')

    expect(!error).toBe(true)
    expect(data.trim()).toBe('test')

  })

  it('should return stderr to error', async () => {

    const { error, data } = await asyncCmd('__test__error__')

    expect(!data).toBe(true)
    expect(typeof error).toBe('string')

  })

  it('should return the 0 exitCode from when cmd exits without error', async () => {

    const { error, data, exitCode } = await asyncCmd('echo test')

    expect(!error).toBe(true)
    expect(exitCode).toBe(0)

  })

  it('should return the 1 exitCode from when cmd exits with error', async () => {

    const { error, data, exitCode } = await asyncCmd('__test__error__')

    expect(!data).toBe(true)
    expect(exitCode).not.toBe(0)

  })

  it('should pass in the current process.env to the spawn', async () => {

    process.env.TEST_PASS_THRU = 'I_AM_A_TEST'
    const { error, data, exitCode } = await asyncCmd('node -pe process.env.TEST_PASS_THRU')

    expect(data.trim()).toBe(process.env.TEST_PASS_THRU)

  })

  it('should use the projects root as the default working directory', async () => {

    let appRoot = path.join(__dirname, '../../')
    // Remove the trailing slash
    appRoot = appRoot.substring(0, appRoot.length - 1)

    const { error, data, exitCode } = await asyncCmd('node -pe process.env.PWD')

    expect(data.trim()).toEqual(appRoot)

  })

  it('should call child_process from passed in directory', async () => {

    const { error, data, exitCode } = await asyncCmd('node -pe process.env.PWD', { cwd: __dirname })

    expect(data.trim()).toEqual(__dirname)

  })

})