import React from 'react'
import { StyleInjector } from '../styleInjector/styleInjector'
import {
  getComponentName,
  useObjWithIdentity,
  usePropClassName,
  useStyleProp,
  useReStyles,
} from './reStyleHooks'

/**
 * Builds a HOC, with custom styles injected into it
 * @function
 * @param {React.Component} Component - Component to wrap with custom styles
 * @param {string} [styleProp='style'] - Alternate props key to use other then 'style'
 *
 * @returns {React.Component} HOC that will inject the custom styles
 */
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
