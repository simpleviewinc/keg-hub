import * as themeEvents from '../../theme/themeEvent'

jest.resetModules()
jest.resetAllMocks()

let clearStyleSheet
const mockAddThemeEvent = (evt, listener) => {
  clearStyleSheet = listener
}

jest.setMock('../../theme/themeEvent', {
  ...themeEvents,
  addThemeEvent: mockAddThemeEvent,
})

const { filterRules, getSelector, addStylesToDom } = require('../injectHelpers')

describe('injectHelpers', () => {
  describe(`filterRules`, () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return an object with with filtered and non-filtered styles', () => {
      const { style, filtered } = filterRules({
        resizeMode: 'fit',
        color: `#111111`,
      })

      expect(style.resizeMode).toBeUndefined()
      expect(style.color).toBe(`#111111`)
      expect(filtered.resizeMode).toBe(`fit`)
      expect(filtered.color).toBeUndefined()
    })

    it('should accept custom filter rules', () => {
      const { style, filtered } = filterRules(
        { resizeMode: 'fit', color: `#111111` },
        ['color']
      )

      expect(style.resizeMode).toBeUndefined()
      expect(style.color).toBeUndefined()
      expect(filtered.resizeMode).toBe(`fit`)
      expect(filtered.color).toBe(`#111111`)
    })
  })

  describe('getSelector', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return a css className selector with a has the passed in className', () => {
      const { selector } = getSelector(`test-class`, `my-test-styles`)
      expect(selector.includes(`test-class`)).toBe(true)
    })

    it('should should add a . to the passed in className', () => {
      const { selector } = getSelector(`test-class`, `my-test-styles`)
      expect(selector.includes(`.test-class`)).toBe(true)
    })

    it('should should accept className as an array', () => {
      const { selector } = getSelector(
        [ `test-class`, `test-class-2` ],
        `my-test-styles`
      )
      expect(selector.includes(`.test-class`)).toBe(true)
      expect(selector.includes(`.test-class-2`)).toBe(true)
    })

    it('should not fail when no className is passed in', () => {
      const { selector } = getSelector(undefined, `my-test-styles`)
      expect(selector).toBe(`.keg-275181350`)
    })

    it('should filter out classnames without prefix `keg`', () => {
      // check if string includes all of the values in the array
      const includes = (str, values) => {
        return values.reduce(
          (accumulator, value) => accumulator && str.includes(value),
          true
        )
      }
      // array classnames
      const { selector } = getSelector(
        [ `test-class`, `test-keg-2`, `keg-text` ],
        `my-test-styles`,
        'keg'
      )
      const includeTestClass = includes(selector, [ `test-class`, `test-keg-2` ])
      expect(includeTestClass).toBe(false)
      expect(selector.includes('keg-text')).toBe(true)

      // string classnames
      const { selector: selector2 } = getSelector(
        `keg-text test-class test-class-2`,
        `my-test-styles`,
        'keg'
      )
      const includeTestClass2 = includes(selector2, [
        `test-class`,
        `test-class-2`,
      ])
      expect(includeTestClass2).toBe(false)
      expect(selector.includes('keg-text')).toBe(true)
    })
  })

  describe('clearStyleSheet', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should clear all styles from the Keg StyleSheet when a build event is fired', () => {
      addStylesToDom(`.test-styles`, { all: `.to-be-cleared{ color: blue; }` })
      const KegStyleSheet = Array.from(document.head.children)[0]

      expect(KegStyleSheet.textContent).toBe(`.to-be-cleared{ color: blue; }`)
      expect(typeof clearStyleSheet).toBe('function')

      clearStyleSheet()

      expect(KegStyleSheet.textContent).toBe('')
    })
  })

  describe('addStylesToDom', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should append the styles to the Dom', () => {
      const KegStyleSheet = Array.from(document.head.children)[0]
      const orgAppend = KegStyleSheet.append
      KegStyleSheet.append = jest.fn()

      addStylesToDom(`.test-styles`, `.test-styles{ color: blue; }`)
      expect(KegStyleSheet.append).toHaveBeenCalled()

      KegStyleSheet.append = orgAppend
    })

    it('should append styles that have already been added', () => {
      const KegStyleSheet = Array.from(document.head.children)[0]
      const orgAppend = KegStyleSheet.append
      KegStyleSheet.append = jest.fn()

      addStylesToDom(`.dup-test`, { all: `.dup-test{ color: blue; }` })
      addStylesToDom(`.dup-test`, { all: `.dup-test{ color: blue; }` })

      expect(KegStyleSheet.append).toHaveBeenCalledTimes(1)
      KegStyleSheet.append = orgAppend
    })

    it('should return undefined if no css is passed in', () => {
      expect(addStylesToDom(`.my-test`)).toBe(undefined)
    })
  })
})
