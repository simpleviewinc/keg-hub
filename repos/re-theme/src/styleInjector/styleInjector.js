import React from 'react'
import { useStyleTag } from './useStyleTag'

/**
 * Helper component that actually calls the useStyleTag hook
 * <br/>Call the useStyleTag hook here to allow calling the hook conditionally
 * <br/>and not break the rules of Hooks
 * @param {Object} props - All props passed to the wrapped Component
 * @param {Object} props.Component - Component being wrapped by the HOC
 * @param {string} props.KegDefClass - Default className of the wrapped Component
 * @param {Object} props.style - Styles to be added to the Dom
 * 
 * @returns {string} - className Css selector of the added style rules
 */
const BuildWithStyles = React.forwardRef((props, ref) => {
  const { Component, children, config, className, KegDefClass, style, ...buildProps } = props
  const classList = useStyleTag(style, className || KegDefClass)

  return (
    <Component
      {...buildProps}
      ref={ref}
      className={classList} 
    >
      {children}
    </Component>
  )
})

/**
 * Custom Hoc that wraps a component, and extracts the style prop from props
 * <br/>It then appends the style props to the Dom
 * <br/>Component must accept a className prop to work properly
 * @param {Object} Component - React Component to wrap
 * @param {Object} config - Settings for the Hoc
 * 
 * @returns {Function} - Anonymous function that wraps the passed in Component
 */
export const StyleInjector = (Component, config={}) => {
  const { className:KegDefClass } = config

  return React.forwardRef(({ style, ...props}, ref) => {
    return !style
      ? (<Component {...props} style={style} ref={ref} />)
      : (
          <BuildWithStyles
            KegDefClass={KegDefClass}
            {...props}
            style={style}
            config={config}
            Component={Component}
            ref={ref}
          />
        )
  })
}

