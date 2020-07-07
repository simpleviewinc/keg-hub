const Models = require('../models/models')
const mockInquirer = global.getMockInquirer()
const { ask } = require('../')



describe('ask', () => {

  afterAll(() => jest.resetAllMocks())

  it('should call inquirer.prompt with passed in questions', async done => {

    const resp = await ask(Models.input)

    expect(mockInquirer.prompt).toHaveBeenCalled()

    done()
  })

})