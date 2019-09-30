const { FS } = require('../../mocks')

jest.setMock('fs', FS)

const testTapName = "test"
const testAppRoot = ""
const buildConstants = require('../buildConstants')

describe('Build Constants', () => {
  
  beforeEach(() => {

  })
  
  it('should fail if appRoot is null', () => {
    expect(() => setupTap(null, {}, testTapName))
      .toThrow(Error)
  })

  it('should fail if appConfig is null', () => {
    expect(() => setupTap(" ", null, testTapName))
      .toThrow(Error)
  })
})
