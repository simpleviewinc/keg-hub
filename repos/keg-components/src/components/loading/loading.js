import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { View } from 'KegView'
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
    <View
      style={theme.join(
        get(theme, 'components.loading.progress'),
        style
      )}
    >
      { text || 'Loading...' }
    </View>
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
    <View
      style={theme.join(
        get(theme, 'components.loading.wrapper'),
        wrapStyle
      )}
    >
      { (children || <Progress style={ style } theme={ theme } text={ text } />) }
    </View>
  )

}

Loading.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  children: PropTypes.object,
}