// Ensure our aliases work in Jest
require('module-alias/register')
// Override the console methods
require('KegMocks/logger/console')

// Override the logger by default
// Will get reset in the Logger tests
const { Logger } = require('KegMocks/logger')
jest.setMock('KegLog', { Logger })

const Tasks = require('KegTasks')
const { getTask } = require('KegMocks/helpers/testTasks')

global.cliTasks = Tasks
global.getTask = getTask
global.testMocks = global.testMocks || {}

// Setup our cache holder
global.getGlobalCliConfig = reset => {
  if(reset) delete require.cache[require.resolve('KegMocks/helpers/globalConfig')]
  return require('KegMocks/helpers/globalConfig')
}
