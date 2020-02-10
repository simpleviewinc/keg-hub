import React from 'react'
import { useTheme } from 're-theme'
import { H5 } from '../../components'
import { get } from 'jsutils'

// type
// key
// description
// default

const buildProp = (prop, style) => {
  return (
    <React.Fragment key={ prop.key } >
      <span style={ style } >
        { prop.key }
      </span>
      <span style={ style } >
        { prop.type }
      </span>
      <span style={ style } >
        { prop.default }
      </span>
      <span style={ style } >
        { prop.description }
      </span>
    </React.Fragment>
  )
}

const buildHeader = style => {
  return (
    <>
      <span style={ style } >
        <b>Name</b>
      </span>
      <span style={ style } >
        <b>Type</b>
      </span>
      <span style={ style } >
        <b>Default</b>
      </span>
      <span style={ style } >
        <b>Description</b>
      </span>
    </>
  )
}

export const ExampleProps = ({ allowed, title }) => {
  title = title || 'Props'
  const theme = useTheme()
  const propStyle = get(theme, 'app.example.grid.prop')
  const headerStyle = get(theme, 'app.example.grid.header')

  return (
    <>
      <H5>{ title }</H5>
      <div style={ get(theme, 'app.example.grid.container') } >
        { buildHeader(theme.join(propStyle, headerStyle)) }
        { allowed.map(prop => buildProp(prop, propStyle))}
      </div>
    </>
  )
}