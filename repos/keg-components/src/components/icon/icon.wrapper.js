import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { isValidComponent } from '../../utils'
import { useThemePath } from 'KegHooks'

/**
 * IconWrapper
 * @summary Custom Icon wrapper component.
 *
 * @param {Object} props - see Icon propTypes
 * @property {String} props.color - color of the Icon
 * @property {String} props.name - name of the Icon
 * @property {Function} props.onPress - function to do when image is pressed
 * @property {Object} props.ref - reference to native element
 * @property {String|Number} props.size - size of the Icon
 * @property {Object} props.styles - custom styles
 * @property {string} props.type - Type of icons to use
 *
 */
export const IconWrapper = React.forwardRef((props, ref) => {
  const theme = useTheme()

  const {
    color,
    Element,
    name,
    size,
    styles,
    themePath,
    type = 'default',
  } = props

  if (!isValidComponent(Element))
    return (
      console.error(`Invalid Element passed to Icon component!`, Element) ||
      null
    )

  const [builtStyles] = useThemePath(themePath || `icon.${type}`, styles)

  const iconProps = {
    ref,
    name,
    style: builtStyles.icon,
    color:
      color ||
      builtStyles.color ||
      get(builtStyles, 'icon.color') ||
      get(theme, 'typography.default.color'),
    size: parseInt(
      size ||
        get(builtStyles, 'icon.fontSize') ||
        get(theme, 'typography.default.fontSize', 15) * 2,
      10
    ),
  }

  return (
    <View style={builtStyles.container}>
      <Element {...iconProps} />
    </View>
  )
})

IconWrapper.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  ref: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  type: PropTypes.string,
}
