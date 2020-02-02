const { limbo } = require('jsutils')
const spawnCmd = require('../spawnCmd')
const path = require('path')

describe('/spawnCmd', () => {

  describe('Spawn exitCode', () => {

    beforeEach(() => jest.resetAllMocks())

    it('should return an successful exitCode', async (done) => {

      const [ err, exitCode ] = await limbo(spawnCmd('sleep 1'))

      setTimeout(() => {
        expect(exitCode).toBe(0)
        done()
      }, 1100)

    })

    it('should return exit code 1 when error throws', async (done) => {
      const [ err, exitCode ] = await limbo(spawnCmd('sleep 1; __test__error__'))

      setTimeout(() => {
        expect(exitCode).toBe(1)
        done()
      }, 1100)

    })

  })

  describe('Spawn onStdOut', () => {

    beforeEach(() => jest.resetAllMocks())

    it('should call onStdOut method when passed in config', async () => {

      const onStdOut = jest.fn()
      const [ err, exitCode ] = await limbo(spawnCmd('echo Test stdout', { onStdOut }))

      expect(onStdOut).toHaveBeenCalled()

    })

  })

  describe('Spawn onStdErr', () => {

    beforeEach(() => jest.resetAllMocks())

    it('should call onStdErr method when passed in config and error throws', async (done) => {
      const onStdErr = jest.fn()
      const [ err, exitCode ] = await limbo(spawnCmd('sleep 1; __test__error__', { onStdErr }))

      setTimeout(() => {
        expect(onStdErr).toHaveBeenCalled()
        done()
      }, 1100)

    })

    it('should NOT call onStdErr method NO error throws', async (done) => {
      const onStdErr = jest.fn()
      const [ err, exitCode ] = await limbo(spawnCmd('sleep 1', { onStdErr }))

      setTimeout(() => {
        expect(onStdErr).not.toHaveBeenCalled()
        done()
      }, 1100)

    })

  })

  describe('Spawn onExit', () => {

    beforeEach(() => jest.resetAllMocks())

    it('should call onExit method when passed in config', async (done) => {
      const onExit = jest.fn()
      const [ err, exitCode ] = await limbo(spawnCmd('sleep 1', { onExit }))

      setTimeout(() => {
        expect(onExit).toHaveBeenCalled()
        done()
      }, 1100)

    })

    it('should call onExit method when passed in config and error throws', async (done) => {
      const onStdErr = jest.fn()
      const [ err, exitCode ] = await limbo(spawnCmd('sleep 1; __test__error__', { onStdErr }))

      setTimeout(() => {
        expect(onStdErr).toHaveBeenCalled()
        done()
      }, 1100)

    })

  })

  describe('Spawn process.env', () => {

    beforeEach(() => jest.resetAllMocks())

    it('should pass in the current process.env to the spawn', async () => {

      process.env.TEST_PASS_THRU = 'I_AM_A_TEST'

      const onStdOut = jest.fn(data => expect(data.trim()).toEqual(process.env.TEST_PASS_THRU))

      const [ err, exitCode ] = await limbo(spawnCmd('node -pe process.env.TEST_PASS_THRU', { onStdOut }))

    })

  })

  describe('Spawn CWD', () => {

    beforeEach(() => jest.resetAllMocks())

    it('should use the projects root as the default working directory', async () => {

      let appRoot = path.join(__dirname, '../../')
      // Remove the trailing slash
      appRoot = appRoot.substring(0, appRoot.length - 1)

      const onStdOut = jest.fn(data => expect(data.trim()).toEqual(appRoot))

      const [ err, exitCode ] = await limbo(spawnCmd('node -pe process.env.PWD', { onStdOut }))

    })

    it('should call spawn from passed in directory', async () => {

      const onStdOut = jest.fn(data => expect(data.trim()).toEqual(__dirname))

      const [ err, exitCode ] = await limbo(spawnCmd('node -pe process.env.PWD', { onStdOut, cwd: __dirname }))

    })

    it('should accept the cwd as a third argument', async () => {

      const onStdOut = jest.fn(data => expect(data.trim()).toEqual(__dirname))

      const [ err, exitCode ] = await limbo(spawnCmd('node -pe process.env.PWD', { onStdOut, }, __dirname))

    })

  })

})