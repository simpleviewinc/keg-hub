
const { hasHelpArg } = require('../hasHelpArg')

describe('hasHelpArg', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return true when passed in arg is a help arg', () => {

     expect(hasHelpArg('-h')).toBe(true)
     expect(hasHelpArg('--help')).toBe(true)

  })

  it('should return false when passed in arg s NOT a help arg', () => {

     expect(hasHelpArg('not-help')).toBe(false)
     expect(hasHelpArg('test-arg')).toBe(false)

  })

})