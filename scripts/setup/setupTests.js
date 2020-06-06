// Ensure our aliases work in Jest
require('module-alias/register')
// Override the console methods
require('KegMocks/logger/console')

// Override the logger by default
// Will get reset in the Logger tests
const { Logger } = require('KegMocks/logger')
jest.setMock('KegLog', { Logger })

const { getTask } = require('KegMocks/helpers/testTasks')
global.getTask = getTask

global.testMocks = global.testMocks || {}

// Setup our cache holder
global.getGlobalCliConfig = reset => {
  if(reset) delete require.cache[require.resolve('KegMocks/helpers/globalConfig')]
  return require('KegMocks/helpers/globalConfig')
}

// These modules always get overwritten
// const { FS } = require('KegMocks/node')
// jest.setMock('fs', FS)

// const { fileSys } = require('KegMocks/libs')
// jest.setMock('KegFileSys', fileSys)

