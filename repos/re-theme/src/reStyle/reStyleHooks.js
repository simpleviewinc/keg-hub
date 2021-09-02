import { useTheme } from '../hooks/useTheme'
import { useMemo, useState, useEffect, useRef } from 'react'
import {
  ensureArr,
  uuid,
  isObj,
  deepMerge,
  noOpObj,
  isFunc,
  shallowEqual,
} from '@keg-hub/jsutils'

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

/**
 * Merges props
 * @param {Object} props - component props
 * @param {*} defaultProps - optional default props defined at reStyle site
 * @returns {Object} - merged props and defaultProps
 */
export const useMergedProps = (props, defaultProps) => {
  // defaultProps will never change, so we can short circuit
  // if its undefined
  if (!defaultProps) return props

  const theme = useTheme()

  const finalDefProps = useMemo(() =>
    isFunc(defaultProps)
      ? defaultProps(theme, props)
      : defaultProps,
    [ theme, props, defaultProps ]
  )

  return useMemo(() => ({ ...finalDefProps, ...props }), [ finalDefProps, props ])
}
