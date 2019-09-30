const { FS } = require('../../mocks')
jest.setMock('fs', FS)

const buildTapList = require('../buildTapList')

describe('Build Tap List', () => {
  
  beforeEach(() => {
    global.testMocks.fs = { stat: true }
  })
  
  it('', () => {
    expect(true).toBe(true)
  })

})
