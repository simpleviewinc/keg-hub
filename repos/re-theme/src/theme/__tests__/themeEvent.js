jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const {
  addThemeEvent,
  fireThemeEvent,
  removeThemeEvent,
} = require('../themeEvent')
const addEvent = 'Add-Event'
const addListener = jest.fn(() => {})
const fireEvent = 'Fire-Event'
const fireListener = jest.fn(() => {})
const removeEvent = 'Remove-Event'
const removeListener = jest.fn(() => {})

let listenerIndexes = []

describe('themeEvent', () => {
  describe('addThemeEvent', () => {
    afterEach(() => {
      listenerIndexes.map(index => removeThemeEvent(addEvent, index))
      listenerIndexes = []
    })

    it('should return the event listeners index', () => {
      const firstIndex = addThemeEvent(addEvent, addListener)
      listenerIndexes.push(firstIndex)
      const secondIndex = addThemeEvent(addEvent, addListener)
      listenerIndexes.push(secondIndex)

      expect(firstIndex).toBe(0)
      expect(secondIndex).toBe(1)
    })

    it('should add a theme event to the listeners', () => {
      const firstIndex = addThemeEvent(addEvent, addListener)
      listenerIndexes.push(firstIndex)

      fireThemeEvent(addEvent)

      expect(addListener).toHaveBeenCalled()
    })
  })

  describe('fireThemeEvent', () => {
    afterEach(() => {
      listenerIndexes.map(index => removeThemeEvent(addEvent, index))
      listenerIndexes = []
    })

    it('should allow call different types of events', () => {
      const addIndex = addThemeEvent(addEvent, addListener)
      listenerIndexes.push(addIndex)

      const fireIndex = addThemeEvent(fireEvent, fireListener)
      listenerIndexes.push(fireIndex)

      fireThemeEvent(addEvent)
      fireThemeEvent(fireEvent)

      expect(addListener).toHaveBeenCalled()
      expect(fireListener).toHaveBeenCalled()
    })

    it('should pass params on to the event listener', () => {
      const fireIndex = addThemeEvent(fireEvent, fireListener)
      listenerIndexes.push(fireIndex)

      fireThemeEvent(fireEvent, 1, 2)

      expect(fireListener).toHaveBeenCalledWith(1, 2)
    })
  })

  describe('removeThemeEvent', () => {
    afterEach(() => {
      listenerIndexes.map(index => removeThemeEvent(addEvent, index))
      listenerIndexes = []
    })

    it('should remove an event from the event listeners', () => {
      const removeIndex = addThemeEvent(removeEvent, removeListener)

      removeThemeEvent(removeEvent, removeIndex)
      fireThemeEvent(removeEvent)

      expect(removeListener).not.toHaveBeenCalled()
    })
  })
})
