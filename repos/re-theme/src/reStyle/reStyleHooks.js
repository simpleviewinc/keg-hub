import { useTheme } from '../hooks/useTheme'
import { useMemo, useState, useEffect, useRef } from 'react'
import {
  ensureArr,
  pickKeys,
  omitKeys,
  uuid,
  isObj,
  deepMerge,
  noOpObj,
  isFunc,
  shallowEqual,
  noPropArr
} from '@keg-hub/jsutils'
import { restructureTheme } from '../theme/restructureTheme'
import { useDimensions, getMergeSizes, getSize } from '../dimensions'
import { Constants } from '../constants'

const { PLATFORM } = Constants

const useStructuredStyles = (dynamicStyles, rootKey='component') => useMemo(() => {
  return [
    // use a root key identifying the theme object (a restructureTheme requirement only)
    restructureTheme({ [rootKey]: { ...dynamicStyles }}),
    omitKeys(dynamicStyles, Object.keys(PLATFORM)),
    rootKey
  ]
}, [ dynamicStyles ])

const useSizedStyles = (structuredStyles, activeSizeKey) => useMemo(() => {
  const [ keys, unused ] = getMergeSizes(activeSizeKey) || noPropArr
  const allKeys = [ ...keys, ...unused ]
  return [
    pickKeys(structuredStyles, allKeys),
    omitKeys(structuredStyles, allKeys)?.component,
    keys
  ]
}, [ structuredStyles, activeSizeKey ])

const useCurrentSize = () => {
  const { width } = useDimensions()
  const [ activeSizeKey ] = useMemo(() => getSize(width), [ width ])
  return activeSizeKey
}

/**
 * Takes in dynamic styles and outputs the compiled styles. Used by `reStyle`
 * @param {Object} dynamicStyles - styles object that can contains size and platform keys, 
 *  in addition to style rule shortcuts
 * @returns {Object} the compiled styles object to be passed to a react or DOM element 
 */
 export const useCompiledStyles = dynamicStyles => {
  // restructure the theme by size keys and platform, 
  const [ structuredStyles, platformlessStyles ] = useStructuredStyles(dynamicStyles)

  // get the size key for the current screen width
  const activeSizeKey = useCurrentSize()

  // get the size keys for the current screen width (e.g. '480px' => [ '$small', '$medium', '$large' ])
  const [ sizedStyles, staticStyles, keys ] = useSizedStyles(structuredStyles, activeSizeKey)

  // compile the final styles
  const compiled = useMemo(
    () => keys?.reduce(
      (acc, key) => sizedStyles[key]
        ? Object.assign(acc, sizedStyles[key])
        : acc,
      {}
    ),
    [ sizedStyles, keys ]
  )

  console.log({ dynamicStyles, structuredStyles, staticStyles, sizedStyles, compiled })

  // merge compiled styles with unsized and platformless styles
  return useMemo(() => ({
    ...compiled?.component,
    ...staticStyles,
    ...platformlessStyles
  }), [ compiled, staticStyles, platformlessStyles ])
}

/**
 * Helper to get the name of a component, or an ID for reference
 * @function
 * @param {React.Component} Component - Component to get the name from
 *
 * @returns {string} - Name of the Component or generated id when name does not exist
 */
export const getComponentName = Component => {
  return (
    Component.displayName ||
    Component.name ||
    `keg-${uuid().split('-')
      .slice(4)
      .join('')}`
  )
}

/**
 * Hook to ensure the className prop is an array with the compName argument added to it
 * @function
 * @param {String|Array} className - Current class names already set
 * @param {string} compName - Name of a component to be added as a class name
 *
 * @returns {Array} - Built array of class names with the compName name added to it
 */
export const usePropClassName = (className, compName) => {
  return useMemo(() => {
    const classArr = className ? ensureArr(className) : []
    compName && classArr.push(compName)

    return classArr
  }, [ className, compName ])
}

/**
 * Hook that memoizes the merged objects using a shallow-equal comparison
 * @function
 * @param {...Object} mergeObjs - objects to be merged, provided there is a shallow difference from the last call
 *
 * @returns {Object} - merged object
 */
export const useShallowMemoMerge = (...mergeObjs) => {
  const identity = useRef(null)

  return useMemo(() => {
    const merged = deepMerge(...mergeObjs)

    const foundIdentity = shallowEqual(identity.current, merged)
      ? identity.current
      : merged

    // if the merged object is shallowly different than the cached identity,
    // update the identity
    if (foundIdentity !== identity.current) {
      identity.current = foundIdentity
    }

    return foundIdentity
  }, [...mergeObjs])
}

/**
 * Hook to memoize the styles and return them
 * <br/> Calls styleData when its a function passing in the theme and props
 * @function
 * @param {Object|function} styleData - Custom styles or function return custom styles
 * @param {Object} props - Props of the component being wrapped
 *
 * @returns {Object} - Build styles object
 */
export const useReStyles = (styleData, props) => {
  const theme = useTheme()
  const [ stateProps, setStateProps ] = useState(props)
  const propsEqual = shallowEqual(props, stateProps)

  useEffect(() => {
    !propsEqual && setStateProps(props)
  }, [propsEqual])

  return useMemo(() => {
    return isFunc(styleData)
      ? styleData(theme, props)
      : isObj(styleData)
        ? styleData
        : noOpObj
  }, [ theme, styleData, propsEqual ])
}
