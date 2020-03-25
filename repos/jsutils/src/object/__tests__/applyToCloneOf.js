const Obj = require('../')

describe('applyToCloneOf', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return a clone with the changes, leaving the original object unchanged', () => {
    const orig = {
      a: 1,
      b: 2
    }

    const result = Obj.applyToCloneOf(orig, (clone) => {
      clone.a = 42
    })

    expect(orig.a).toEqual(1)
    expect(result.a).toEqual(42)
    expect(result.b).toEqual(2)
  })

  it('should call console.warn on bad input', () => {
    const orgWarn = console.warn
    console.warn = jest.fn()

    Obj.applyToCloneOf(null, () => {})
    expect(console.warn).toHaveBeenCalled()
    console.warn.mockClear()
    
    Obj.applyToCloneOf(1, () => {})
    expect(console.warn).toHaveBeenCalled()
    console.warn.mockClear()
    
    Obj.applyToCloneOf({}, null)
    expect(console.warn).toHaveBeenCalled()
    console.warn.mockClear()
    
    Obj.applyToCloneOf({}, "I am not a function")
    expect(console.warn).toHaveBeenCalled()
    console.warn.mockClear()

    console.warn = orgWarn
  })

  it('should return the original object when on bad input', () => {
    const orgWarn = console.warn
    console.warn = jest.fn()
    
    const original = {}
    const notClone = Obj.applyToCloneOf(original, null)
    
    expect(console.warn).toHaveBeenCalled()
    expect(notClone === original).toEqual(true)

    console.warn = orgWarn
  })

  it('should work with delete', () => {
    const orig = {
      a: 1,
      b: 2
    }

    const updated = Obj.applyToCloneOf(orig, clone => {
      delete clone['a']
    })

    expect(updated.a).toEqual(undefined)
    expect(orig.a).toEqual(1)
  })

})
