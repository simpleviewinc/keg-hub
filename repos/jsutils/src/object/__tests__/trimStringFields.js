const Obj = require('../')

describe('trimStringFields', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should trim all string fields of an object', () => {
    const testObj = { test: '   I am A strIng   ', data: [ 1,2,3,4 ] }
    const trimmedObj = Obj.trimStringFields(testObj)

    expect(trimmedObj.test).toEqual('I am A strIng')
  })

  it('should not change non-string fields', () => {
    const testObj = { test: '   I am A strIng   ', data: [ 1,2,3,4 ] }
    const trimmedObj = Obj.trimStringFields(testObj)

    expect(trimmedObj.data).toEqual(testObj.data)
  })

})
