const { validate } = require('../validation')
const { isArr } = require('../array')
const { isStr } = require('../string')
const { isNum } = require('../number')

const { mockConsole } = require('jestlib')

describe('validate', () => {
  let resetMocks = null

  beforeEach(() => {
    resetMocks = mockConsole(['error'])
  })

  afterEach(() => {
    resetMocks()
    jest.resetAllMocks()
    validate.resetOptions()
  })

  it ('should validate all conditions, returning true if all are valid', () => {
    const x = 3
    const y = 'hello' 
    const z =  []

    const [ isValid ] = validate({ x, y, z }, { 
      x: x => x > 0, 
      y: isStr,
      z: isArr
    })
    expect(isValid).toBe(true)
    expect(console.error).toHaveBeenCalledTimes(0)
  })

  it ('should return false for a failure, and it should error log that failure', () => {
    const x = 3
    const y = 1
    const z = 'wow' 

    const [ isValid ] = validate({ x, y, z }, { 
      x: x => x < 0, 
      y: isStr,
      z: isArr
    })

    
    expect(isValid).toBe(false)
    expect(console.error).toHaveBeenCalledTimes(3)
  })

  it ('should work with the $default parameter', () => {
    const x = 3
    const y = 1
    const z = 'wow' 

    const [ isValid ] = validate({ x, y, z }, { 
      $default: isNum,
      z: isStr,
    })

    expect(isValid).toBe(true)
    expect(console.error).toHaveBeenCalledTimes(0)
  })

  it ('should return failed cases object', () => {
    const x = 3
    const y = 1
    const z = 'wow' 

    const [ isValid, results ] = validate({ x, y, z }, { 
      x: x => x < 0, 
      y: isStr,
      z: isArr
    })

    expect(results.x.success).toBe(false)
    expect(results.x.reason.length > 0).toBe(true)
    
    expect(isValid).toBe(false)
    expect(console.error).toHaveBeenCalledTimes(3)
  })

  describe ('options', () => {
    it ('should handle the throws option', () => {
      const x = 3
      expect(() => validate({ x }, { x: isArr }, { throws: true }))
        .toThrow()
      expect(console.error).toHaveBeenCalledTimes(0)
    })

    it ('should handle the logs option', () => {
      const x = 1
      const [ valid ] = validate({ x }, { x: isArr }, { logs: false })
      expect(valid).toBe(false)
      expect(console.error).toHaveBeenCalledTimes(0)
    })


    it('should handle the prefix option', () => {
      const prefix = '123'
      const x = 1
      validate({ x }, { x: isArr }, { prefix })
      expect(console.error).toHaveBeenCalledWith(prefix, "Argument \"x\" with value ", 1, " failed validator: isArr." )
    })
  })

  describe ('global options', () => {
    it ('should handle the throws global', () => {
      validate.setOptions({ throws: true, logs: false })    
      const x = 1

      expect(() => validate({ x }, { x: x => x < 0 }))
        .toThrow()

      expect(console.error).toHaveBeenCalledTimes(0)
    })

    it ('should handle the logs global', () => {
      validate.setOptions({ logs: false })    
      const x = 1

      const [ valid ] = validate({ x }, { x: isArr })
      expect(valid).toBe(false)
      expect(console.error).toHaveBeenCalledTimes(0)
    })


    it('should handle the prefix global', () => {
      const options = { prefix: '123' }
      validate.setOptions(options)    

      const x = 1
      validate({ x }, { x: isArr })

      expect(console.error).toHaveBeenCalledWith(options.prefix, "Argument \"x\" with value ", 1, " failed validator: isArr." )
    })

  })
})