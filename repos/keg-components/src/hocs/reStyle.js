import React, { useMemo, useState, useEffect } from 'react'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { useTheme } from '@keg-hub/re-theme'
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

const getComponentName = Component => {
  return (
    Component.displayName ||
    Component.name ||
    `keg-${uuid().split('-')
      .slice(4)
      .join('')}`
  )
}

const usePropClassName = (className, compName) => {
  return useMemo(() => {
    const classArr = className ? eitherArr(className, [className]) : []
    classArr.push(compName)

    return classArr
  }, [ className, compName ])
}

const useObjWithIdentity = (identity, ...mergeObjs) => {
  return useMemo(() => {
    clearObj(identity)
    Object.assign(identity, deepMerge(...mergeObjs))

    return identity
  }, [ identity, ...mergeObjs ])
}

const useStyleProp = (styleProp, props) => {
  return useMemo(() => {
    return props[styleProp] || noOpObj
  }, [ styleProp, props[styleProp] ])
}

const useReStyles = (styleData, props) => {
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

export const reStyle = (Component, styleProp = 'style') => {
  const joinStyles = {}
  const compName = getComponentName(Component)
  const InjectedComp = StyleInjector(Component, {
    displayName: compName,
    className: compName,
  })

  return styleData => {
    const StyledFun = React.forwardRef((props, ref) => {
      const reStyles = useReStyles(styleData, props)
      const classArr = usePropClassName(props.className, compName)
      const styleFromProps = useStyleProp(styleProp, props)
      const styles = useObjWithIdentity(joinStyles, reStyles, styleFromProps)

      return (
        <InjectedComp
          {...props}
          {...{ [styleProp]: styles }}
          style={styles}
          className={classArr}
          ref={ref}
        />
      )
    })

    StyledFun.displayName = `reStyle(${compName})`

    return StyledFun
  }
}
