import { Platform } from 'react-native'

const ios = { OS: 'ios' }
const android = { OS: 'android' }
const web = { OS: 'web' }

const orig = Platform.OS

describe('Platform | isNative', () => {
  afterEach(() => {
    Platform.OS = orig
  })

  it('should return true if on ios or android', () => {
    Platform.OS = ios.OS
    const result = require('../isNative').isNative()
    expect(result).toEqual(true)

    Platform.OS = android.OS
    const androidResult = require('../isNative').isNative()
    expect(androidResult).toEqual(true)
  })

  it('should return false for non-native platforms', () => {
    Platform.OS = web.OS
    const result = require('../isNative').isNative()
    expect(result).toEqual(false)
  })
})
