import { Constants } from '../../constants'

jest.resetModules()

const UnitRules = require('../unitRules')

describe('Theme', () => {

  describe('checkValueUnits', () => {

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return the value if its not a number or string', () => {

      expect(UnitRules.checkValueUnits('test', "")).toEqual("")

      const arr = []
      expect(UnitRules.checkValueUnits('test', arr)).toEqual(arr)

      const obj = {}
      expect(UnitRules.checkValueUnits('test', obj)).toEqual(obj)

      const bool = true
      expect(UnitRules.checkValueUnits('test', bool)).toEqual(bool)

    })

    it('should return the value if its a key in the noUnitRules object', () => {

      Object.keys(UnitRules.noUnitRules).map(key => {
        expect(UnitRules.checkValueUnits(key, 100)).toBe(100)
      })

    })

    it('should add px units to the value if it does not have them', () => {

      expect(UnitRules.checkValueUnits('test', 100)).toBe(`100px`)
      expect(UnitRules.checkValueUnits('test', 0)).toBe(`0px`)
      expect(UnitRules.checkValueUnits('test', -30)).toBe(`-30px`)
      expect(UnitRules.checkValueUnits('test', 3.14)).toBe(`3.14px`)

    })

  })

})