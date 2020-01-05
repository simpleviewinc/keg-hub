import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { View } from 'KegView'
import { Indicator } from 'KegIndicator'
import { Text } from '../'
import { isValidComponent } from '../../utils'

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
  const { styles, text, theme, loadIndicator } = props
  const LoadingIndicator = loadIndicator || Indicator

  return (
    <View
      style={theme.get(
        `${styles.styleId}-progress`,
        'components.loading.progress',
        styles.progress
      )}
    >
      { isValidComponent(LoadingIndicator) ? (<LoadingIndicator />) : text && (
        <Text
          style={theme.get(
            `${styles.styleId}-text`,
            'components.loading.text',
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
  const { children, text, indicator } = props
  const styleId = props.styleId || `keg-loading`
  const styles = props.styles || {}
  styles.styleId = styleId

  return (
    <View
      style={theme.get(
        `${styleId}-wrapper`,
        'components.loading.wrapper',
        styles.wrapper
      )}
    >
      { children || (
        <Progress
          styles={ styles }
          theme={ theme }
          text={ text }
          loadIndicator={ indicator }
        />
      )}
    </View>
  )

}

Loading.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  children: PropTypes.object,
}