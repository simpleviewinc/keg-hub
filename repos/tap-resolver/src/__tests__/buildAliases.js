const { FS } = require('../../mocks')
jest.setMock('fs', FS)

const buildAliases = require('../buildAliases')

describe('Build Aliases', () => {
  
  beforeEach(() => {
    global.testMocks.fs = { stat: true }
  })
  
  it('', () => {
    expect(true).toBe(true)
  })

})
