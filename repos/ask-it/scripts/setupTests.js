// Always auto-mock inquirer
const { inquirer } = require('../src/__mocks__/inquirer')

global.getMockInquirer = () => inquirer
jest.setMock('inquirer', inquirer)
