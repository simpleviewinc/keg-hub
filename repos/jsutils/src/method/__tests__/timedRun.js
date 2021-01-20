import { timedRun } from '../timedRun'
import { wait } from '../../promise/wait'

describe('timedRun', () => {
  it('should handle nullish input', async done => {
    const [ result, duration ] = await timedRun(null)
    expect(result).toBeUndefined()
    expect(duration).toEqual(-1)
    done()
  })

  it('should time functions', async done => {
    const fnArg = 'some_value'
    const waitTime = 30 //ms

    const fn = arg => wait(waitTime).then(_ => arg)

    const [ result, duration ] = await timedRun(fn, fnArg)
    expect(result).toEqual(fnArg)
    expect(duration).toBeGreaterThanOrEqual(waitTime)

    done()
  })
})