jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const updateSizeMap = {
  xsmall: 20,
  small: 3,
  medium: 45,
  large: 567,
  xlarge: 123456
}

const sizeMap = require('../sizeMap')

describe('sizeMap', () => {

  describe('setSizes', () => {

    afterEach(() => {
      sizeMap.setSizes({
        xsmall: 1,
        small: 320,
        medium: 768,
        large: 1024,
        xlarge: 1366,
      })
    })

    it('should update the sizes of the sizeMap', () => {

      sizeMap.setSizes(updateSizeMap)
      const sizeMapObj = sizeMap.getSizeMap()
      const updateKeys = Object.keys(updateSizeMap)

      sizeMapObj.entries.map(entry => {
        expect( updateKeys.indexOf(entry[0]) ).not.toBe(-1)
        expect( updateSizeMap[ entry[0] ] ).toBe(entry[1])
      })

    })

    it('should not accept parameters other then an object', () => {
      const oldErr = console.error
      console.error = jest.fn()
      const orgSizeMap = sizeMap.getSizeMap()

      let data = sizeMap.setSizes()
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes([])
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes('')
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes(123)
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes(true)
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes(false)
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes(null)
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      data = sizeMap.setSizes(undefined)
      expect(data).toBe(undefined)
      expect(orgSizeMap).toBe(sizeMap.getSizeMap())

      expect(console.error).toHaveBeenCalledTimes(8)

      console.error = oldErr

    })

    it('should return the sizeMap object after its been updated', () => {
      
      expect(updateSizeMap).not.toBe(sizeMap.getSizeMap())
      expect(sizeMap.setSizes(updateSizeMap)).toBe(sizeMap.getSizeMap())

    })

    it('should not add sizes other xsmall, small, medium, large, xlarge to the sizeMap', () => {

      sizeMap.setSizes({ ...updateSizeMap, NO_ADD: 1337 })
      const sizeMapObj = sizeMap.getSizeMap()

      sizeMapObj.entries.map(entry => expect(entry[0]).not.toBe('NO_ADD'))

    })

    it('should convert size values to a number', () => {
      
      const updated = sizeMap.setSizes({ ...updateSizeMap, xsmall: '1337' })
      const sizeMapObj = sizeMap.getSizeMap()

      sizeMapObj.entries.map(entry => {
        if(entry[0] !== 'xsmall') return

        expect(typeof entry[1]).toBe('number')
        expect(entry[1]).toBe(1337)

      })

    })

    it('should update the hash property', () => {
      
      sizeMap.setSizes(updateSizeMap)
      const sizeMapObj = sizeMap.getSizeMap()
      const updateKeys = Object.keys(updateSizeMap)

      Object.keys(sizeMapObj.hash).map(key => {

        expect( updateKeys.indexOf(key) ).not.toBe(-1)
        expect( updateSizeMap[ key ] ).toBe(sizeMapObj.hash[key])

      })

    })

  })

  describe('getSize', () => {

    it('should return an entry array', () => {

      const size = sizeMap.getSize()
      
      expect(size.length).toBe(2)
      expect(typeof size[0]).toBe('string')
      expect(size[1]).not.toBe(undefined)

    })

    it('should return the default to xsmall entry when no value is passed in', () => {

      const size = sizeMap.getSize()
      
      expect(size[0]).toBe('xsmall')
      expect(size[1]).toBe(1)

    })

    it('should return the entry closest to the width', () => {

      const xsmall = sizeMap.getSize(1)
      expect(xsmall[0]).toBe('xsmall')
      expect(xsmall[1]).toBe(1)

      const xsmall2 = sizeMap.getSize(100)
      expect(xsmall2[0]).toBe('xsmall')
      expect(xsmall2[1]).toBe(1)

      const small = sizeMap.getSize(321)
      expect(small[0]).toBe('small')
      expect(small[1]).toBe(320)

      const small2 = sizeMap.getSize(450)
      expect(small2[0]).toBe('small')
      expect(small2[1]).toBe(320)

      const medium = sizeMap.getSize(768)
      expect(medium[0]).toBe('medium')
      expect(medium[1]).toBe(768)

      const medium2 = sizeMap.getSize(1023)
      expect(medium2[0]).toBe('medium')
      expect(medium2[1]).toBe(768)

      const large = sizeMap.getSize(1365)
      expect(large[0]).toBe('large')
      expect(large[1]).toBe(1024)

      const xlarge = sizeMap.getSize(2000)
      expect(xlarge[0]).toBe('xlarge')
      expect(xlarge[1]).toBe(1366)

    })

  })

  describe('getMergeSizes', () => {
    
    it('should return an array with the passed in size and all sizes below it', () => {

      const xsmallDown = sizeMap.getMergeSizes('xsmall')
      expect(xsmallDown.length).toBe(1)
      expect(xsmallDown[0]).toBe('xsmall')

      const smallDown = sizeMap.getMergeSizes('small')
      expect(smallDown.length).toBe(2)
      expect(smallDown[0]).toBe('xsmall')
      expect(smallDown[1]).toBe('small')

      const mediumDown = sizeMap.getMergeSizes('medium')
      expect(mediumDown.length).toBe(3)
      expect(mediumDown[0]).toBe('xsmall')
      expect(mediumDown[1]).toBe('small')
      expect(mediumDown[2]).toBe('medium')

      const largeDown = sizeMap.getMergeSizes('large')
      expect(largeDown.length).toBe(4)
      expect(largeDown[0]).toBe('xsmall')
      expect(largeDown[1]).toBe('small')
      expect(largeDown[2]).toBe('medium')
      expect(largeDown[3]).toBe('large')

      const xlargeDown = sizeMap.getMergeSizes('xlarge')
      expect(xlargeDown.length).toBe(5)
      expect(xlargeDown[0]).toBe('xsmall')
      expect(xlargeDown[1]).toBe('small')
      expect(xlargeDown[2]).toBe('medium')
      expect(xlargeDown[3]).toBe('large')
      expect(xlargeDown[4]).toBe('xlarge')

    })

  })

  describe('getSizeMap', () => {

    it('should return the sizeMap object', () => {

      const sizeMapObj = sizeMap.getSizeMap()

      expect(typeof sizeMapObj).toBe('object')
      expect(Array.isArray(sizeMapObj.entries)).toBe(true)
      expect(typeof sizeMapObj.hash).toBe('object')
      expect(typeof sizeMapObj.indexes).toBe('object')

    })

  })

})
