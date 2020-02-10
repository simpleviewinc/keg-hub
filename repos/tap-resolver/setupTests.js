const { FS } = require('./src/mocks')
jest.setMock('fs', FS)

global.testMocks = global.testMocks || {}
global.testMocks.fs = {}
