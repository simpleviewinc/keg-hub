const { BaseStorage } = require('../baseStorage')
const baseStore = new BaseStorage()

describe('BaseStorage', () => {

  describe('createPromise', () => {

    it('should return a promise', () => {
      expect(typeof baseStore.createPromise().then).toBe('function')
    })

    it('should call the passed in method', async () => {

      const method = jest.fn()
      await baseStore.createPromise(method)

      expect(method).toHaveBeenCalled()

    })

    it('should resolved the response of the passed in method', async () => {

      const method = () => ('foo')
      const [ error, res] = await baseStore.createPromise(method)

      expect(res).toBe('foo')

    })

  })

  describe('logMessage', () => {

    it('should call a console method based on the first argument', () => {

      const oldLog = console.log
      console.log = jest.fn()
      baseStore.logMessage('log')

      expect(console.log).toHaveBeenCalled()

      console.log = oldLog

    })

    it('should throw an error when error is passed in as the first argument', () => {
      expect(() => baseStore.logMessage('error')).toThrow()
    })


  })

  describe('getItem', () => {

    it('should call baseStore.logMessage', async () => {
      const oldLog = baseStore.logMessage
      baseStore.logMessage = jest.fn()
      await baseStore.getItem()
      
      expect(baseStore.logMessage).toHaveBeenCalled()

      baseStore.logMessage = oldLog

    })

  })

  describe('setItem', () => {

    it('should call baseStore.logMessage', async () => {
      const oldLog = baseStore.logMessage
      baseStore.logMessage = jest.fn()
      await baseStore.setItem()
      
      expect(baseStore.logMessage).toHaveBeenCalled()

      baseStore.logMessage = oldLog

    })

  })

  describe('removeItem', () => {

    it('should call baseStore.logMessage', async () => {
      const oldLog = baseStore.logMessage
      baseStore.logMessage = jest.fn()
      await baseStore.removeItem()
      
      expect(baseStore.logMessage).toHaveBeenCalled()

      baseStore.logMessage = oldLog

    })

  })

})
