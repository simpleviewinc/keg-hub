import { Mocks } from 'SVMocks'
const { KeyStore } = require('../keyStore.native')

const cleanUp = () => {
  Mocks.resetMocks()
  window.localStorage.reset()
}

describe('KeyStore', () => {

  beforeEach(() => cleanUp())

  describe('getItem', () => {

    beforeEach(() => cleanUp())

    it('should call getItem method of localStorage ', async () => {

      await KeyStore.getItem('test')

      expect(window.localStorage.getItem).toHaveBeenCalled()

    })

    it('should return a promise that resolves the value of the passed in key', async () => {

      const val = await KeyStore.getItem('test')

      expect(val).toBe(window.localStorage.storage.test)

    })

  })

  describe('setItem', () => {

    beforeEach(() => cleanUp())

    it('should call setItem method of window.localStorage ', async () => {

      await KeyStore.setItem('test', 'thing')

      expect(window.localStorage.setItem).toHaveBeenCalled()

    })

    it('should return a promise that resolves to true when the value is saved', async () => {

      const val = await KeyStore.setItem('test', 'thing')

      setTimeout(() => {
        expect(val).toBe(true)
        expect(window.localStorage.storage.test).toBe('thing')
      })

    })

  })

  describe('removeItem', () => {
    beforeEach(() => cleanUp())

    it('should call removeItem method of window.localStorage ', async () => {

      await KeyStore.removeItem('test')

      expect(window.localStorage.removeItem).toHaveBeenCalled()

    })

    it('should return a promise that resolves to true when the value is removed', async () => {

      const val = await KeyStore.removeItem('test')

      setTimeout(() => {
        expect(val).toBe(true)
        expect(window.localStorage.storage.test).toBe(undefined)
      })

    })

  })

})
