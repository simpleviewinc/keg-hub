// Ensure our aliases work in Jest
require('module-alias/register')

// Setup our cache holder
global.testMocks = global.testMocks || {}

// Override the console methods
require('KegMocks/logger/console')

// These modules always get overwritten
// const { FS } = require('KegMocks/node')
// jest.setMock('fs', FS)

// const { fileSys } = require('KegMocks/libs')
// jest.setMock('KegFileSys', fileSys)

