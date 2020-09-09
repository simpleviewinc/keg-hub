import { useMemo } from 'react'
import { get, isArr } from '@keg-hub/jsutils'
import { colors } from '../theme/colors'
import { useClassList } from 'KegClassList'
import { noOpObj } from '../utils/helpers/noop'

/**
 * Uses the surfaces defined in the colors to build surface specific classes for
 * @param {string} themeRef - Either the type or themePath passed to the component
 * @param {string} defRef - The default reference to use for the class
 *
 * @returns {Array} - Built classList based on surfaces and themeRef
 */
const useThemeType = (themeRef = '', defRef) => {
  return useMemo(() => {
    if (!themeRef) return defRef

    const themeSplit = themeRef.split('.')
    const surface = themeSplit.pop()
    const typeRef = themeSplit.pop()
    const surfaces = Object.keys(get(colors, 'surface', noOpObj))

    return typeRef && surfaces.indexOf(surface)
      ? [ `${defRef}-${typeRef}`, surface ]
      : surface
        ? [`${defRef}-${surface}`]
        : [defRef]
  }, [ themeRef, defRef ])
}

/**
 * Helper hook to call get the theme type then use that to create the classList
 * @param {string} themeRef - Either the type or themePath passed to the component
 * @param {string} defClass - The default class for the component
 * @param {Array|string} className - Custom class name passed to the component
 *
 * @returns {Array} - Built classList response from useClassList
 */
export const useThemeTypeAsClass = (themeRef = '', defClass, className) => {
  const themeTypeCls = useThemeType(themeRef, defClass)
  const classList = isArr(className)
    ? className.concat(themeTypeCls)
    : [ ...themeTypeCls, className ]

  return useClassList(defClass, classList)
}
