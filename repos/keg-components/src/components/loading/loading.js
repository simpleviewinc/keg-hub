import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Indicator } from 'KegIndicator'
import { Text } from '../typography/text'
import { isValidComponent } from '../../utils'
import { noOpObj } from '../../utils/helpers/noop'
import { spacedJoin } from '../../utils/helpers/spacedJoin'
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
    <View style={styles.progress} className='keg-progress' >
      { isValidComponent(LoadingIndicator) ? (
        <LoadingIndicator
          size={size}
          styles={styles.indicator}
          type={type}
        />
      ) : (
        text && <Text style={styles.text}>{ text }</Text>
      ) }
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
  const {
    classNames=noOpObj,
    dataSet=noOpObj,
    children,
    text = 'Loading',
    indicator,
    size,
    styles,
    themePath,
    type = 'default',
  } = props

  const [builtStyles] = useThemePath(themePath || `loading.${type}`, styles)

  return (
    <View
      style={builtStyles.container}
      className={spacedJoin(classNames.loading, 'keg-loading')}
      dataSet={dataSet}
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
  wrapStyle: PropTypes.object,
  children: PropTypes.object,
}
