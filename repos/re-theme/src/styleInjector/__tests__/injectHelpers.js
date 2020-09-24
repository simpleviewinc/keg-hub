jest.resetModules()
jest.resetAllMocks()

const { hyphenator, hashString, getSelector, addStylesToDom } = require('../injectHelpers')

describe('injectHelpers', () => {

  describe('hyphenator', () => {

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should hyphenate the passed in string', () => {
      expect(hyphenator(`marginTop`)).toBe(`margin-top`)
      expect(hyphenator(`backgroundColor`)).toBe(`background-color`)
      expect(hyphenator(`borderTopLeftRadius`)).toBe(`border-top-left-radius`)
      expect(hyphenator(`someTestString`)).toBe(`some-test-string`)
    })

    it('should not fail on pre-hyphenated strings', () => {
      expect(hyphenator(`some-test-string`)).toBe(`some-test-string`)
    })

  })

  describe('hashString', () => {

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should create a hash of the passed in string', () => {
      const hash = hashString(`{ test: "data" }`)
      expect(hash).toBe(`1441025846`)
    })

    it('should create the same hash when the passed in string is the same', () => {
      expect(hashString(`{ test: "data" }`)).toBe(hashString(`{ test: "data" }`))
    })

    it('should create the different hashes when the passed in string is the differnt', () => {
      expect(hashString(`{ test: "data" }`)).not.toBe(hashString(`{ test: "data1" }`))
      expect(hashString(`{ test: "data" }`)).not.toBe(hashString(`{ test: "1data" }`))
      expect(hashString(`{ test: "data" }`)).not.toBe(hashString(`{ test1: "data" }`))
    })

  })

  describe('getSelector', () => {

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return a css className selector with a has the passed in className', () => {
      const selector = getSelector(`test-class`, `my-test-styles`)
      expect(selector.includes(`test-class`)).toBe(true)
    })

    it('should should add a . to the passed in className', () => {
      const selector = getSelector(`test-class`, `my-test-styles`)
      expect(selector.includes(`.test-class`)).toBe(true)
    })

    it('should not fail when no className is passed in', () => {
      const selector = getSelector(undefined, `my-test-styles`)
      expect(getSelector(undefined, `my-test-styles`)).toBe(`.keg-275181350`)
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

      addStylesToDom(`.test-styles`, `{ color: blue; }`)
      expect(KegStyleSheet.append).toHaveBeenCalled()

      KegStyleSheet.append = orgAppend
    })

    it('should append styles that have already been added', () => {
      const KegStyleSheet = Array.from(document.head.children)[0]
      const orgAppend = KegStyleSheet.append
      KegStyleSheet.append = jest.fn()

      addStylesToDom(`.dup-test`, `{ color: blue; }`)
      addStylesToDom(`.dup-test`, `{ color: blue; }`)
      expect(KegStyleSheet.append).toHaveBeenCalledTimes(1)
      KegStyleSheet.append = orgAppend
    })

    it('should return undefined if no css is passed in', () => {
      expect(addStylesToDom(`.my-test`)).toBe(undefined)
    })

  })


})
