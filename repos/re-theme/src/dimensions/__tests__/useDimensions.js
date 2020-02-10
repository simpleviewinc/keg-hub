jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const useState = jest.fn(data => {
  const setData = jest.fn()
  return [ data, setData ]
})

const useEffect = jest.fn(func => {
  return func()
})

jest.setMock('react', { useState, useEffect })

const { useDimensions } = require('../useDimensions')

const dimKeys = [ 'width', 'height', 'scale', 'fontScale' ]


describe('useDimensions', () => {

  it('should return the dimensions object when called', () => {
    const dims = useDimensions()
    Object.keys(dims).map(key => expect(dimKeys.indexOf(key)).not.toBe(-1))
  })

})
