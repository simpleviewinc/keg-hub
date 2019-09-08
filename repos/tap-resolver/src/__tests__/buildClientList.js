const { FS } = require('../../mocks')
jest.setMock('fs', FS)

const buildClientList = require('../buildClientList')

describe('Build Client List', () => {
  
  beforeEach(() => {
    global.testMocks.fs = { stat: true }
  })
  
  it('', () => {
    expect(true).toBe(true)
  })

})
