jest.resetModules()

const oldWarn = console.warn
console.warn = jest.fn()
const { hexToRgba, opacity, shadeHex, toRgb, transition } = require('../colors')

describe('colors', () => {
  afterAll(() => {
    console.warn = oldWarn
  })

  describe('hexToRgba', () => {
    afterEach(() => jest.clearAllMocks())

    it('should return an rgba string when asObj argument is false', () => {
      expect(hexToRgba('#111111', 0.1, false)).toBe(`rgba(17, 17, 17, 0.1)`)
    })

    it('should return an rgba object when asObj argument is true', () => {
      const rgbaObj = hexToRgba('#111111', 0.1, true)
      expect(rgbaObj.r).toBe(17)
      expect(rgbaObj.g).toBe(17)
      expect(rgbaObj.b).toBe(17)
      expect(rgbaObj.a).toBe(0.1)
    })

    it('should return it should work with opacity greater then 1', () => {
      const rgbaObj = hexToRgba('#ffffff', 50, true)
      expect(rgbaObj.a).toBe('0.5000')
    })

    it('should work with 3 char long hex', () => {
      expect(hexToRgba(`#aba`, 50)).toBe(`rgba(171, 170, 186, 0.5000)`)
      expect(hexToRgba(`#fff`, 1)).toBe(`rgba(255, 255, 255, 1)`)
      expect(hexToRgba(`#000`, 0)).toBe(`rgba(0, 0, 0, 0)`)
    })

    it('should return rgba(255,255,255,0) when no hex is passed in', () => {
      const rgbaObj = hexToRgba(null, 50, true)
      expect(rgbaObj).toBe(`rgba(255,255,255,0)`)
    })

    it('should call console.warn when no hex is a passed in', () => {
      console.warn.mockClear()
      hexToRgba(null, 50, true)
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('opacity', () => {
    afterEach(() => jest.clearAllMocks())

    it('should be an function with an array of mapped opacity', () => {
      expect(opacity._100).toBe('rgba(0,0,0, 1.00)')
      expect(opacity._95).toBe('rgba(0,0,0, 0.95)')
      expect(opacity._90).toBe('rgba(0,0,0, 0.90)')
      expect(opacity._85).toBe('rgba(0,0,0, 0.85)')
      expect(opacity._80).toBe('rgba(0,0,0, 0.80)')
      expect(opacity._75).toBe('rgba(0,0,0, 0.75)')
      expect(opacity._70).toBe('rgba(0,0,0, 0.70)')
      expect(opacity._65).toBe('rgba(0,0,0, 0.65)')
      expect(opacity._60).toBe('rgba(0,0,0, 0.60)')
      expect(opacity._55).toBe('rgba(0,0,0, 0.55)')
      expect(opacity._50).toBe('rgba(0,0,0, 0.50)')
      expect(opacity._45).toBe('rgba(0,0,0, 0.45)')
      expect(opacity._40).toBe('rgba(0,0,0, 0.40)')
      expect(opacity._35).toBe('rgba(0,0,0, 0.35)')
      expect(opacity._30).toBe('rgba(0,0,0, 0.30)')
      expect(opacity._25).toBe('rgba(0,0,0, 0.25)')
      expect(opacity._20).toBe('rgba(0,0,0, 0.20)')
      expect(opacity._15).toBe('rgba(0,0,0, 0.15)')
      expect(opacity._10).toBe('rgba(0,0,0, 0.10)')
      expect(opacity._5).toBe('rgba(0,0,0, 0.05)')
      expect(opacity._0).toBe('rgba(0,0,0, 0.00)')
    })
  })

  describe('shadeHex', () => {
    afterEach(() => jest.clearAllMocks())

    it('should convert a hex to a shaded based on percent', () => {
      expect(shadeHex(`#777777`, 20)).toBe(`#8e8e8e`)
      expect(shadeHex(`#111111`, 34)).toBe(`#161616`)
    })

    it('should accept negative numbers', () => {
      expect(shadeHex(`#777777`, -20)).toBe('#5f5f5f')
      expect(shadeHex(`#ffffff`, -50)).toBe(`#7f7f7f`)
    })
  })

  describe('toRgb', () => {
    afterEach(() => jest.clearAllMocks())

    it('should convert passed in values to rgba string', () => {
      expect(toRgb(17, 34, 12, 1)).toBe(`rgba(17, 34, 12, 1)`)
    })

    it('should accept the first argument as an object', () => {
      expect(toRgb({ r: 17, g: 34, b: 12, a: 1 })).toBe(`rgba(17, 34, 12, 1)`)
    })

    it('should set the alpha channel to 1 when not passed', () => {
      expect(toRgb({ r: 17, g: 34, b: 12 })).toBe(`rgba(17, 34, 12, 1)`)
    })

    it('should set the alpha channel to the passed in value when not passed', () => {
      expect(toRgb({ r: 17, g: 34, b: 12, a: 0.34 })).toBe(
        `rgba(17, 34, 12, 0.34)`
      )
    })
  })

  describe('transition', () => {
    afterEach(() => jest.clearAllMocks())

    it('should return a transition object with a built transition string', () => {
      expect(transition('color').transition).toBe('color 250ms ease')
    })

    it('should accept an array of props as the first argument', () => {
      expect(transition([ 'color', 'background-color' ]).transition).toBe(
        'color 250ms ease, background-color 250ms ease'
      )
    })

    it('should allow overwriting the default timing', () => {
      expect(transition('color', 100).transition).toBe('color 100ms ease')
    })

    it('should add ms to the timing when its a number', () => {
      expect(transition('color', 100).transition).toBe('color 100ms ease')
    })

    it('should NOT add ms to the timing when its a string', () => {
      expect(transition('color', `1s`).transition).toBe('color 1s ease')
    })

    it('should use the default 250ms when timing is not a string or number', () => {
      expect(transition('color', []).transition).toBe('color 250ms ease')
    })

    it('should allow overwriting the default transition type', () => {
      expect(transition('color', undefined, `linear`).transition).toBe(
        'color 250ms linear'
      )
    })
  })
})
