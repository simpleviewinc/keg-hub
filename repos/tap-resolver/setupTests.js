const { FS } = require('./mocks')
jest.setMock('fs', FS)

global.testMocks = global.testMocks || {}
global.testMocks.fs = {}
