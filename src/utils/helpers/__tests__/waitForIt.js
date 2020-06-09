
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { waitForIt } = require('../waitForIt')

let checkAmount = 0
const check = () => {
  checkAmount++
  return checkAmount > 3
}

let ranFinish
const onFinish = jest.fn(() => {
  ranFinish = true
})

describe('waitForIt', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should wait for it', async done => {
    waitForIt({
      check,
      onFinish,
      amount: 4,
      wait: 0
    })
    .then(res => {
      setTimeout(() => {

        expect(checkAmount).not.toBe(0)
        expect(onFinish).toHaveBeenCalled()
        expect(ranFinish).toBe(true)

        done()
      }, 3000)
    })
    

  })

})