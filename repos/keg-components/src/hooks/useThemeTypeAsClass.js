import { useMemo } from 'react'
import { get, isArr, eitherArr } from '@keg-hub/jsutils'
import { colors } from '../theme/colors'
import { useClassList } from 'KegClassList'
import { noOpObj } from '../utils/helpers/noop'

/**
 * Uses the surfaces defined in the colors to build surface specific classes for
 * @param {string} themeLoc - Either the type or themePath passed to the component
 * @param {string} defClass - The default reference to use for the class
 *
 * @returns {Array<string>} - Built classList based on surfaces and themeLoc
 */
const useThemeType = (themeLoc, defClass) => {
  return useMemo(() => {
    const defClassArr = eitherArr(defClass, [defClass])

    if (!themeLoc) return defClassArr

    const themeSplit = themeLoc.split('.')
    const surface = themeSplit.pop()
    const typeRef = themeSplit.pop()
    const surfaces = Object.keys(get(colors, 'surface', noOpObj))

    return typeRef && surfaces.indexOf(surface)
      ? [ `${defClass}-${typeRef}`, surface ]
      : surface
        ? [`${defClass}-${surface}`]
        : defClassArr
  }, [ themeLoc, defClass ])
}

/**
 * Helper hook to call get the theme type then use that to create the classList
 * @param {string} themeLoc - Either the type or themePath passed to the component
 * @param {string} defClass - The default class for the component
 * @param {Array|string} className - Custom class name passed to the component
 *
 * @returns {Array<string>} - Built classList response from useClassList
 */
export const useThemeTypeAsClass = (themeLoc = '', defClass, className) => {
  const themeTypeCls = useThemeType(themeLoc, defClass)
  const classList = isArr(className)
    ? className.concat(themeTypeCls)
    : [ ...themeTypeCls, className ]

  return useClassList(defClass, classList)
}
