const { limbo } = require('jsutils')
const spawnCmd = require('../spawnCmd')

describe('/spawnCmd', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should return an succesful exitCode', async (done) => {
    const [ err, exitCode ] = await limbo(spawnCmd('ls -la'))
    expect(exitCode).toBe(0)
    done()
  })

})