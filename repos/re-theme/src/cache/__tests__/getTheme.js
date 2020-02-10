
import { testTheme as theme, buttonTheme } from '../../mocks'
import { isObj } from 'jsutils'

jest.resetModules()

const { getTheme } = require('../getTheme')
theme.get = getTheme

describe('getTheme', () => {

  describe('getTheme', () => {
    
    afterEach(() => jest.clearAllMocks())

    it('should return a joined styles object', () => {

      const styles = theme.get(
        'test-id',
        [ 'components', 'button', 'default' ],
        { width: 200, height: 40 }
      )

      expect(isObj(styles)).toBe(true)
      expect(styles.width).toBe(200)

    })
    
  })

})