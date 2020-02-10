import { testTheme, buttonTheme } from '../../mocks'
import { get, deepClone } from 'jsutils'

jest.resetModules()

let themeClone = deepClone(testTheme)

const Theme = require('../restructureTheme')

describe('Theme', () => {

  describe('restructureTheme', () => {

    afterEach(() => {
      jest.clearAllMocks()
      themeClone = deepClone(testTheme)
    })

    it('should build the size map on the theme object', () => {

      expect(testTheme.xsmall).toBe(undefined)
      expect(testTheme.medium).toBe(undefined)
      expect(testTheme.large).toBe(undefined)
      expect(testTheme.xlarge).toBe(undefined)

      const theme = Theme.restructureTheme(themeClone)

      expect(typeof theme.xsmall).toBe('object')
      expect(typeof theme.medium).toBe('object')
      expect(typeof theme.large).toBe('object')
      expect(typeof theme.xlarge).toBe('object')

    })

    it('should move the sized theme styles to the correct theme size location', () => {

      const xsmText = get(themeClone, 'meeting.xsmall.text.user')
      const smText = get(themeClone, 'meeting.small.text.user')
      const mdText = get(themeClone, 'meeting.medium.$web.text.user')
      const lgText = get(themeClone, 'meeting.large.text.$web.time')
      const xlgText = get(themeClone, 'meeting.xlarge.text.time')

      const theme = Theme.restructureTheme(themeClone)

      expect(theme.xsmall.meeting.text.user).toEqual(xsmText)
      expect(theme.small.meeting.text.user).toEqual(smText)
      expect(theme.medium.meeting.text.user).toEqual(mdText)
      expect(theme.large.meeting.text.time).toEqual(lgText)
      expect(theme.xlarge.meeting.text.time).toEqual(xlgText)

    })

    it('should update the theme to use the values of the current platform', () => {

      const webList = get(testTheme, 'meeting.xsmall.meetingList.$web')

      expect(webList).not.toBe(undefined)
      expect(get(testTheme, 'xsmall.meeting.meetingList')).toBe(undefined)
      expect(get(testTheme, 'meeting.xsmall.meetingList.$native')).not.toBe(undefined)

      const theme = Theme.restructureTheme(themeClone)

      expect(get(theme, 'meeting.xsmall.meetingList.$web')).toBe(undefined)
      expect(get(theme, 'meeting.xsmall.meetingList.$native')).toBe(undefined)

      expect(get(theme, 'xsmall.meeting.meetingList')).toEqual(webList)

    })

    it('should return an updated theme using the current platform values', () => {

      expect(get(testTheme, 'large.meeting.text.time.font')).toBe(undefined)
      expect(get(testTheme, 'meeting.large.text.time.font')).toBe(undefined)
      expect(get(testTheme, 'meeting.large.text.$web.time.font')).toBe('WEB FONT')

      const theme = Theme.restructureTheme(themeClone)

      expect(get(theme, 'large.meeting.text.time.font')).toBe('WEB FONT')

    })

    it('should NOT remove sub platform keys once a platform key is found', () => {

      const webNative = get(testTheme, 'meeting.medium.$web.$native')
      expect(webNative).not.toBe(undefined)

      const theme = Theme.restructureTheme(themeClone)

      expect(get(theme, 'medium.meeting.$native')).toEqual(webNative)

    })


    it('should add px to number values without units', () => {

      expect(get(testTheme, 'meeting.medium.$web.$web.text.user.width')).toEqual(200)

      const theme = Theme.restructureTheme(themeClone)

      expect(get(theme, 'medium.meeting.$web.text.user.width')).toEqual('200px')

    })

    it('should allow passing custom platforms as the second argument', () => {

      const webFont = get(testTheme, 'meeting.large.text.$web.time.font')
      expect(webFont).toEqual('WEB FONT')

      const customFont = get(testTheme, 'meeting.large.text.$customPlatform.time.font')
      expect(customFont).toEqual('CUSTOM FONT')

      expect(get(testTheme, 'large.meeting.text.time.font')).toEqual(undefined)

      const webTheme = Theme.restructureTheme(deepClone(testTheme))
      expect(get(webTheme, 'large.meeting.text.time.font')).toEqual(webFont)

      const cutomTheme = Theme.restructureTheme(deepClone(testTheme), { '$customPlatform': true })
      expect(get(cutomTheme, 'large.meeting.text.time.font')).toEqual(customFont)

    })


  })

})
