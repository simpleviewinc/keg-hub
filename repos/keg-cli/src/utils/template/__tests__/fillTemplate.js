const path = require('path')
const { Logger } = require('KegMocks/logger')
jest.setMock('KegLog', { Logger })

const { fillTemplate } = require('../fillTemplate')

describe('fillTemplate', () => {

  afterAll(() => jest.resetAllMocks())

  it('should fill passed in string templates', () => {

    const filled = fillTemplate({
      template: 'I am a {{ thing }}',
      data: { thing: 'test' },
    })

    expect(filled).toBe('I am a test')

  })

  it('should load and fill template from a passed in location', async () => {

    const testTemplate = path.join(__dirname, './test-template.tmp')

    const filled = await fillTemplate({
      loc: testTemplate,
      data: { thing: 'test-from-file' },
    })

    expect(filled).toBe('I am a test-from-file')

  })


})