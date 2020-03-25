const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('uuid', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return a valid uuid', () => {
    const uuid = Method.uuid()
    if (!uuid || typeof uuid !== 'string') return false
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    const isValid =  regex.test(uuid)
    
    expect(typeof uuid).toEqual('string')
    expect(isValid).toEqual(true)
  })

  it('should not return uuids that are the same', () => {
    const uuid = Method.uuid()
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(uuid).not.toEqual(Method.uuid())
    expect(Method.uuid()).not.toEqual(Method.uuid())
  })

})
