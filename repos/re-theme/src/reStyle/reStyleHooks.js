import { useTheme } from '../hooks/useTheme'
import { useMemo, useState, useEffect } from 'react'
import {
  eitherArr,
  uuid,
  clearObj,
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
    const classArr = className ? eitherArr(className, [className]) : []
    classArr.push(compName)

    return classArr
  }, [ className, compName ])
}

/**
 * Hook that ensures a consistent Object identity to avoid re-renders
 * @function
 * @param {Object} identity - Object to be reused
 * @param {Array} mergeObjs - Other objects to be merged with the identity object
 *
 * @returns {Object} - identity object merged with the passed in mergeObjs
 */
export const useObjWithIdentity = (identity, ...mergeObjs) => {
  return useMemo(() => {
    clearObj(identity)
    Object.assign(identity, deepMerge(...mergeObjs))

    return identity
  }, [ identity, ...mergeObjs ])
}

/**
 * Hook to get the styles from the props using the styleProp
 * @function
 * @param {string} styleProp - `style` || Custom style prop key to use
 * @param {Object} props - Props of the component being wrapped
 *
 * @returns {Object} - Styles from the props
 */
export const useStyleProp = (styleProp, props) => {
  return useMemo(() => {
    return props[styleProp] || noOpObj
  }, [ styleProp, props[styleProp] ])
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
