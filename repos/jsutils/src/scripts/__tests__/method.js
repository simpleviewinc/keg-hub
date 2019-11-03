
const Method = require('../method')


describe('/method', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('checkCall', () => {

    it('should check if a method, and call it with passed in params', () => {
      const testMethod = jest.fn(() => {})
      Method.checkCall(testMethod, 1,2,3)
      expect(testMethod).toHaveBeenCalledWith(1,2,3)
    })

    it('should not try to call a method if its not a function', () => {
      expect(Method.checkCall(null, 1,2,3)).toEqual(undefined)
    })

  })

  describe('debounce', () => {

    it('should call the passed method after the correct amount of time', done => {
      const testMethod = jest.fn(() => {})
      const boundMethod = Method.debounce(testMethod, 100)
      boundMethod()

      setTimeout(() => {
        expect(testMethod).not.toHaveBeenCalled()
      }, 99)
      setTimeout(() => {
        expect(testMethod).toHaveBeenCalled()
        done()
      }, 101)
    })

    it('should use 250 as default wait time when not wait time is passed', done => {
      const testMethod = jest.fn(() => {})
      const boundMethod = Method.debounce(testMethod)
      boundMethod()

      setTimeout(() => {
        expect(testMethod).not.toHaveBeenCalled()
      }, 50)
      setTimeout(() => {
        expect(testMethod).toHaveBeenCalled()
        done()
      }, 251)
    })

    it('should call immediately is passed in as true', done => {
      const testMethod = jest.fn(() => {})
      const boundMethod = Method.debounce(testMethod, 300)
      boundMethod()
      const nowMethod = Method.debounce(testMethod, 300, true) 
     
      setTimeout(() => {
        expect(testMethod).not.toHaveBeenCalled()
        nowMethod()
        expect(testMethod).toHaveBeenCalled()
        done()
      }, 50)
    })

    it('should not try to call the fun if a fun is not passed in', () => {
      const testMethod = jest.fn(() => {})
      const boundMethod = Method.debounce(undefined)

      expect(boundMethod()).toEqual(null)
    })

  })

  describe('doIt', () => {

    it('should execute the callback n times based on passed in param', () => {
      
      
    })

  })
  

  describe('isFunc', () => {

    it('should return true when passed in parm is a function', () => {
      expect(Method.isFunc(jest.fn())).toEqual(true)
    })

    it('should return false when passed in parm is not a function', () => {
      expect(Method.isFunc(null)).toEqual(false)
    })

  })

  describe('memorize', () => {

    it('should return a function', () => {
      
    })

    it('should return the last response to a method when params are the same', () => {
      
    })

    it('should set the response to the memorize cache', () => {
      
    })

    it('should clear the cache when memorize.destroy is called', () => {
      
    })

  })

  describe('throttle', () => {

    it('should only call the passed in method once over a given amount of time', () => {
      
    })

  })
  
  describe('throttleLast', () => {

    it('should only call the last method passed to it', () => {
      
    })

  })

  describe('uuid', () => {

    it('should return a valid uuid', () => {
      const uuid = Method.uuid()
      if (!uuid || typeof uuid !== 'string') return false
      const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      const isValid =  regex.test(uuid)
      
      expect(typeof uuid).toEqual('string')
      expect(isValid).toEqual(true)
    })

    it('should not return uuids that are the same', () => {
      const uuid = Method.uuid()
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(uuid).not.toEqual(Method.uuid())
      expect(Method.uuid()).not.toEqual(Method.uuid())
    })

  })

  describe('pipeline', () => {
    const square = (x) => x * x
    const subtractBy = (x, y) => x - y
    const startingValue = 2
    it('should return the value run through the pipeline', () => {
      const result = Method.pipeline(
        startingValue,
        (num) => num + 1,
        square
      )

      expect(result).toEqual(9)
    })

    it('should work with array expressions', () => {
      const result = Method.pipeline(
        2,
        square,
        [subtractBy, 5] // take the square of 2 and subtract 5 from it
      )
      expect(result).toEqual(-1)
    })

    it('should NOT call its first argument, if it is a function', () => {
      const result = Method.pipeline(() => 2, (x) => x() * 10)
      expect(result).toEqual(20)
    })

    it('should return the element if no functions are specified', () => {
      const element = "foo"
      const result = Method.pipeline(element)
      expect(result).toEqual(element)
    })

    it('should log errors if it encountered an invalid expression', () => {
      const orgError = console.error
      console.error = jest.fn()
      expect(Method.pipeline(1, square, "invalid expression")).toEqual(1)
      expect(console.error).toHaveBeenCalled()
      console.error = orgError
    })
  })
})