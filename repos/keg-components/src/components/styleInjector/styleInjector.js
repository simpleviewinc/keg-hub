import React from 'react'
import { useStyleTag } from './useStyleTag'

const BuildNoStyles = ({ Component, ...props}) => {
  return (<Component {...props} />)
}

const BuildWithStyles = ({ Component, children, config, className, KegDefClass, style, ...props }) => {
  const classList = useStyleTag(style, className || KegDefClass)
  return (
    <Component {...props} className={classList} >
      {children}
    </Component>
  )
}

export const StyleInjector = (Component, config={}) => {
  const { className:defClass, ...defConfig } = config

  return ({ style, ...props}) => {
    return !style
      ? (<BuildNoStyles {...props} Component={Component} />)
      : (
        <BuildWithStyles
          KegDefClass={defClass}
          {...props}
          style={style}
          config={defConfig}
          Component={Component}
        />
      )
  }
}

