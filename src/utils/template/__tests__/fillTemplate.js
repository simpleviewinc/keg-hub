const { Logger } = require('KegMocks/logger')
jest.setMock('KegLog', { Logger })

const { fillTemplate } = require('../fillTemplate')

describe('fillTemplate', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should fill passed in string templates', () => {

    const filled = fillTemplate({
      template: 'I am a {{ thing }}',
      data: { thing: 'test' },
    })

    expect(filled).toBe('I am a test')

  })

  it('should fill passed in path templates', () => {

    const filled = fillTemplate({
      loc: path.join('test-template.tmp'),
      data: { thing: 'test-from-file' },
      root: __dirname,
    })

    expect(filled).toBe('I am a test-from-file')

  })


})