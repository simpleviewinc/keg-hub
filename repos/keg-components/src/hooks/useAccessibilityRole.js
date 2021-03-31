import { useMemo } from 'react'
import { getPlatform } from 'KegGetPlatform'
import { noOpObj, isStr } from '@keg-hub/jsutils'

const isWeb = getPlatform() === 'web'

/**
 * Returns the passed in AccessibilityRole if on a web platform
 * @param {string} role - String role of the AccessibilityRole
 * @param {string} nativeRole - String role of the AccessibilityRole when on native
 *
 * @returns {Object} - Contains the accessibilityRole with the role when on web
 */
export const useAccessibilityRole = (role, nativeRole) => {
  return useMemo(() => {
    return isWeb && isStr(role)
      ? { accessibilityRole: role }
      : isStr(nativeRole)
        ? { accessibilityRole: nativeRole }
        : noOpObj
  }, [ isWeb, role, nativeRole ])
}
