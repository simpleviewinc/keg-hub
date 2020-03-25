const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

const promiseHelper = isValid => new Promise((res, rej) => {
  setTimeout(() => {
    isValid
      ? res(`Promise Valid`)
      : rej(new Error(`Promise Error`))
  }, 100)
})

describe('limbo', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return an array with the length of 2', async (done) => {
    const response = await Method.limbo(promiseHelper(true))

    expect(typeof response).toBe('object')
    expect(isArr(response)).toBe(true)
    expect(response.length).toBe(2)

    done()
  })

  it('should return an error for first slot when the promise is rejected', async (done) => {
    const [ err, data ] = await Method.limbo(promiseHelper(false))

    expect(err instanceof Error).toBe(true)
    expect(err.message).toEqual(`Promise Error`)

    done()
  })

  it('should return null for first slot when an error is not throw', async (done) => {
    const [ err, data ] = await Method.limbo(promiseHelper(true))

    expect(err).toBe(null)

    done()
  })

  it('should return promise response for second slot when error is not throw', async (done) => {
    const [ err, data ] = await Method.limbo(promiseHelper(true))

    expect(data).toEqual(`Promise Valid`)

    done()
  })

  it('should return an error for first slot when no promise is passed in', async (done) => {
    const [ err, data ] = await Method.limbo()

    expect(err instanceof Error).toBe(true)

    done()
  })

  it('should return an error for first slot when an error is thrown', async (done) => {
    const [ err, data ] = await Method.limbo()

    expect(err instanceof Error).toBe(true)

    done()
  })

})