import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { View } from 'KegView'
import { Text } from '../'
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
  const { styles, text, theme } = props
  return (
    <View
      style={theme.join(
        get(theme, 'components.loading.progress'),
        styles.progress
      )}
    >
      { text && (
        <Text
          style={theme.join(
            get(theme, 'components.loading.text'),
            styles.text
          )}
        >
        { text }
        </Text>
      )}
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
  const { children, text } = props
  const styles = props.styles || {}
  
  return (
    <View
      style={theme.join(
        get(theme, 'components.loading.wrapper'),
        styles.wrapper
      )}
    >
      { (children || <Progress styles={ styles } theme={ theme } text={ text } />) }
    </View>
  )

}

Loading.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  children: PropTypes.object,
}