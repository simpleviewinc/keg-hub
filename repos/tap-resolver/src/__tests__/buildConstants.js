const { FS } = require('../../mocks')

jest.setMock('fs', FS)

const testClientName = "testClient"
const testAppRoot = ""
const buildConstants = require('../buildConstants')

describe('Build Constants', () => {
  
  beforeEach(() => {

  })
  
  it('should fail if appRoot is null', () => {
    expect(() => setupClient(null, {}, testClientName))
      .toThrow(Error)
  })

  it('should fail if appConfig is null', () => {
    expect(() => setupClient(" ", null, testClientName))
      .toThrow(Error)
  })
})
