// Ensure our aliases work in Jest
require('module-alias/register')

// Always auto-mock inquirer
const { inquirer } = require('KegMocks/inquirer')

global.getMockInquirer = () => inquirer
jest.setMock('inquirer', inquirer)
