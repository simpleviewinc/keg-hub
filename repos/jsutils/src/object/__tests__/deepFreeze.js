const Obj = require('../')

describe('deepFreeze', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should recursively freeze an object and its children', () => {
    const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
    Obj.deepFreeze(obj)

    expect(Object.isFrozen(obj)).toEqual(true)
    expect(Object.isFrozen(obj.data)).toEqual(true)
    expect(Object.isFrozen(obj.sub)).toEqual(true)
  })

})