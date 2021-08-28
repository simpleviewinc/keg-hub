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
import { getDefaultPlatforms } from '../theme/restructureTheme'
import { Constants, ruleHelpers } from '../constants'
import { 
  useDimensions, 
  getMergeSizes, 
  getSize 
} from '../dimensions'

const PLATFORM = Constants.PLATFORM

/**
 * *(useCompiledStyles helper)*
 * @returns {string} size key for current screen width
 */
const useCurrentSize = () => {
  const { width } = useDimensions()
  const [ activeSizeKey ] = useMemo(() => getSize(width), [ width ])
  return activeSizeKey
}

const usePlatforms = () => {
 return useMemo(() => {
    const active = getDefaultPlatforms()
    return [ 
      active, 
      Object
        .values(PLATFORM)
        .filter(key => !active.includes(key))
    ]
  }, [])
}

/**
 * Takes in dynamic styles and outputs the compiled styles. Used by `reStyle`
 * @param {Object} dynamicStyles - styles object that can contains size and platform keys, 
 *  in addition to style rule shortcuts
 * @returns {Object} the compiled styles object to be passed to a react or DOM element 
 */
 export const useCompiledStyles = dynamicStyles => {
  const [ platforms, unusedPlatforms ] = usePlatforms()

  const activeSizeKey = useCurrentSize()
  const [ activeSizes, inactiveSizes ] = useMemo(
    () => getMergeSizes(activeSizeKey) || noPropArr,
    [ activeSizeKey ]
  )

  const invalidKeys = useMemo(
    () => unusedPlatforms.concat(inactiveSizes),
    [ unusedPlatforms, inactiveSizes ]
  )

  return useMemo(
    () => compileStyles(dynamicStyles, platforms, activeSizes, invalidKeys),
    [ dynamicStyles, platforms, activeSizeKey, invalidKeys ]
  )
}

const compileStyles = (styles, platforms, sizes, omit) => {
  if (!isObj(styles)) return styles

  const structured = Object.entries(styles).reduce(
    (acc, [ key, value ]) => {
      if (platforms.includes(key) || sizes.includes(key)) {
        // compile the styles defined by `key`, then merge them with
        // all previous compiled styles identified by the same key
        acc[key] = {
          ...acc[key],
          ...compileStyles(value, platforms, sizes, omit)
        }
      }
      else if (!omit.includes(key)) {
        // convert shortcut keys, if used (e.g. m => margin)
        // then add the entry to the compiled styles object
        const trueKey = ruleHelpers[key] || key
        acc[trueKey] = value
      }

      return acc
    },
    {}
  )

  const extract = (obj, key) => {
    obj[key] && Object.assign(obj, obj[key])
    delete obj[key]
    return obj
  }

  // sizes and platforms have an order of precedence, indicated by
  // the order of keys in `platforms` and `sizes` (from least-specific to most). 
  // So remove the dynamic keys, in precedence order, and merge their values
  // with the final styles object in that order
  const fromPlatforms = platforms.reduce(extract, structured)
  return sizes.reduce(extract, fromPlatforms)
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
