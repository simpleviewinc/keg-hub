import { Constants } from '../../constants'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const dimKeys = [ 'fontScale', 'height', 'scale', 'width' ]

const { Dimensions } = require('../webDimensions.js')

jest.resetModules()

describe('Dimensions', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('get', () => {
    it('should get the passed in key from the dimensions object', () => {
      const win = Dimensions.get('window')
      const screen = Dimensions.get('screen')
      const test = Dimensions.get('test')

      expect(test).toBe(undefined)

      dimKeys.map(key => {
        expect(win[key]).not.toBe(undefined)
        expect(screen[key]).not.toBe(undefined)
      })
    })
  })

  describe('set', () => {
    it('should set the screen or window key on dimensions object', () => {
      const screen = Dimensions.get('screen')

      expect(screen.test).toBe(undefined)

      Dimensions.set({ screen: { test: 'foo' } })
      const setScreen = Dimensions.get('screen')

      expect(setScreen.test).toBe('foo')

      const win = Dimensions.get('window')

      expect(win.test).toBe(undefined)

      Dimensions.set({ window: { test: 'foo' } })
      const setWin = Dimensions.get('window')

      expect(setWin.test).toBe('foo')

      Dimensions.set('screen', screen)
      Dimensions.set('window', win)
    })

    it('should not set other keys on dimensions object', () => {
      Dimensions.set({ test: 'boo' })

      expect(Dimensions.get('test')).toBe(undefined)
    })
  })

  describe('update', () => {
    beforeEach(() => jest.clearAllMocks())

    it('should set the window and screen to the current window dimensions', () => {
      Dimensions.set({ screen: { test: 'foo' } })
      Dimensions.set({ window: { test: 'boo' } })

      expect(Dimensions.get('screen').test).toBe('foo')
      expect(Dimensions.get('window').test).toBe('boo')

      Dimensions.update()

      const win = Dimensions.get('window')
      const screen = Dimensions.get('screen')

      dimKeys.map(key => {
        expect(win[key]).not.toBe(undefined)
        expect(screen[key]).not.toBe(undefined)
      })
    })

    it('should call any functions registered to the change event', () => {
      const listener = jest.fn()
      Dimensions.addEventListener(Constants.CHANGE_EVENT, listener)
      Dimensions.update()

      const callScreen = listener.mock.calls[0][0].screen
      const callWin = listener.mock.calls[0][0].window

      expect(callScreen).toBe(Dimensions.get('screen'))
      expect(callWin).toBe(Dimensions.get('window'))
      expect(listener).toHaveBeenCalled()
    })
  })

  describe('addEventListener', () => {
    it('should add a listener to the passed in event type', () => {
      const listener = jest.fn()
      Dimensions.addEventListener(Constants.CHANGE_EVENT, listener)
      Dimensions.update()

      expect(listener).toHaveBeenCalled()
    })
  })

  describe('removeEventListener', () => {
    it('should remove a listener from the passed in event type', () => {
      const listener = jest.fn()
      Dimensions.addEventListener(Constants.CHANGE_EVENT, listener)
      Dimensions.removeEventListener(Constants.CHANGE_EVENT, listener)
      Dimensions.update()

      expect(listener).not.toHaveBeenCalled()
    })
  })
})
