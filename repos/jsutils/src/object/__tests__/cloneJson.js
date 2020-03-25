const Obj = require('../')

describe('cloneJson', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should clone the passed in object, and its children', () => {
    const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
    const clone = Obj.cloneJson(obj)

    expect(typeof clone).toEqual('object')
    expect(clone === obj).toEqual(false)
    expect(clone.sub === obj.sub).toEqual(false)
  })

  it('should call console.error and not throw on invalid json Object', () => {
    const consoleErr = console.error
    console.error = jest.fn()
    const obj = { test: 'I am a string' }
    const obj2 = { obj: obj, data: 'some data' }
    obj.obj2 = obj2
    const clone = Obj.cloneJson(obj)
    
    expect(console.error).toHaveBeenCalled()
    expect(clone).toEqual(null)
    console.error = consoleErr
  })
  
})























