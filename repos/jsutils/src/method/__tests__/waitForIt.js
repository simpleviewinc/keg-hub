const { waitForIt } = require('../waitForIt')

let checkAmount = 0
let validAmount = 3
const check = jest.fn(() => {
  checkAmount++
  return checkAmount > validAmount
})

const onFinish = jest.fn(() => {})

const reset = () => {
  checkAmount = 0
  validAmount = 3
  onFinish.mockReset()
}

jest.setTimeout(12000)

describe('waitForIt', () => {

  afterAll(() => jest.resetAllMocks())

  it('should wait for it', async done => {
    validAmount = 4
    waitForIt({
      check,
      onFinish,
      amount: 5,
      wait: 0
    })
    .then(res => {
      setTimeout(() => {

        expect(check).toHaveBeenCalledTimes(5)
        expect(onFinish).toHaveBeenCalledTimes(1)

        reset()
        
        waitForIt({
          check,
          onFinish,
        })
        .then(res => {
          setTimeout(() => {

            // Expect 9 times called. 5 for the first test, 4 for this test ( default is 4 )
            expect(check).toHaveBeenCalledTimes(9)
            expect(onFinish).toHaveBeenCalledTimes(1)

            done()
          }, 5000)
        })
        
      }, 3000)
    })

  })

})