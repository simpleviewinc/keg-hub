import { parseErrorMessage } from '../'

describe('parseErrorMessage', () => {
  it('should return the input if it is a string', () => {
    const test = 'test'
    expect(parseErrorMessage(test)).toEqual(test)
  })

  it('should return the message if input is an object', () => {
    const test = { message: 'foo' }
    expect(parseErrorMessage(test)).toEqual(test.message)
    expect(parseErrorMessage(new Error(test.message))).toEqual(test.message)
  })

  it('should return null if input is not an error or string', () => {
    expect(parseErrorMessage(null)).toBeNull()
    expect(parseErrorMessage({})).toBeUndefined()
    expect(parseErrorMessage(45)).toBeNull()
  })
})