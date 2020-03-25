const Str = require('../')

describe('trainCase', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a string into train case', () => {
    const testString = 'I am A strIng'
    const trainCase = Str.trainCase(testString)

    expect(trainCase).toEqual('i-am-a-str-ing')
  })

  it('should return passed in data when data is not a string', () => {
    const dirty = {}
    const cleaned = Str.trainCase(dirty)

    expect(cleaned).toEqual(dirty)
  })

})
