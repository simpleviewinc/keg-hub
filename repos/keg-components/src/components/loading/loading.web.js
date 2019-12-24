import React from 'react'
import { useTheme } from 're-theme'
import { get } from 'jsutils'

/**
 * Progress
 * @summary Custom Progress component. All props are optional
 *
 * @param {*} props
 * @property {String} props.text - button text
 * @property {Object} props.style - custom style
 * @property {Object} props.theme - App theme object
 *
 */
const Progress = (props) => {
  const { style, text, theme } = props
  return (
    <span
      style={theme.join(
        get(theme, 'components.loading.progress'),
        style
      )}
    >
      { text || 'Loading...' }
    </span>
  )
}

/**
 * Loading
 * @summary Custom Loading component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {String} props.text - button text
 * @property {Object} props.style - custom style
  * @property {Object} props.wrapStyle - custom wrapper style
 * @property {Object} props.children
 *
 */
export const Loading = props => {
  const theme = useTheme()
  const { children, wrapStyle, style, text } = props

  return (
    <div
      style={theme.join(
        get(theme, 'components.loading.wrapper'),
        wrapStyle
      )}
    >
      { (children || <Progress style={ style } theme={ theme } text={ text } />) }
    </div>
  )

}

Loading.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  children: PropTypes.object,
}