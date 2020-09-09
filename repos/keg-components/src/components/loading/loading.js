import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Indicator } from 'KegIndicator'
import { Text } from '../typography/text'
import { isValidComponent } from '../../utils'
import { useClassList } from '../../hooks/useClassList'
import { useThemePath } from 'KegHooks'

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
const Progress = props => {
  const { styles, text, loadIndicator, type, size } = props
  const LoadingIndicator = loadIndicator || Indicator

  return (
    <View
      style={styles.progress}
      className='keg-progress'
    >
      { isValidComponent(LoadingIndicator) ? (
        <LoadingIndicator
          size={size}
          styles={styles.indicator}
          type={type}
        />
      ) : (
        text && (
          <Text
            className='keg-progress-text'
            style={styles.text}
          >
            { text }
          </Text>
        )
      ) }
    </View>
  )
}

/**
 * Loading
 * @summary Custom Loading component. All props are optional
 *
 * @param {Object} props - see Loading.propTypes
 * @property {String} props.className - Class name of the root element
 * @property {String} props.text - Text to display while loading
 * @property {number} props.size - Size of the loading indicator
 * @property {Object} props.styles - Styles object tree
 * @property {Object} props.themePath - Custom path to styles on the theme
 * @property {Object} props.type - Theme type to use
 * @property {Object} props.children - Custom Children of the loading component
 *
 */
export const Loading = props => {
  const {
    className,
    children,
    text = 'Loading',
    indicator,
    size,
    styles,
    themePath,
    type = 'default',
  } = props

  const builtStyles = useThemePath(themePath || `loading.${type}`, styles)

  return (
    <View
      style={builtStyles.main}
      className={useClassList('keg-loading', className)}
    >
      { children || (
        <Progress
          styles={builtStyles}
          text={text}
          loadIndicator={indicator}
          type={type}
          size={size}
        />
      ) }
    </View>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.object,
}
