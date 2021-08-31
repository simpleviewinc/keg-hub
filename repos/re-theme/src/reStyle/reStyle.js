import React from 'react'
import { exists } from '@keg-hub/jsutils'
import { StyleInjector } from 'StyleInjector'

import {
  getComponentName,
  useShallowMemoMerge,
  usePropClassName,
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
  const compName = getComponentName(Component)
  const InjectedComp = StyleInjector(Component, {
    displayName: compName,
    className: compName,
  })

  return styleData => {
    const StyledFun = React.forwardRef((props, ref) => {
      const reStyles = useReStyles(styleData, props)
      const classArr = usePropClassName(props.className, compName)
      const styleFromProps = exists(props[styleProp]) ? props[styleProp] : null

      const styles = useShallowMemoMerge(reStyles, styleFromProps)

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
