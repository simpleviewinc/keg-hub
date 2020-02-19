import React, { useState } from 'react'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { isValidComponent } from '../../utils'

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
 * @property {Object} props.style - custom style
 * @property {string} props.type - Type of icons to use
 *
 */
export const IconWrapper = React.forwardRef((props, ref) => {
  const theme = useTheme()

  const {
    children,
    color,
    Element,
    isWeb,
    name,
    size,
    style,
    styles,
    type,
    ...attrs
  } = props

  const containerStyle = theme.get(
    'components.icon.container',
    get(styles, 'container'),
    styles
  )

  const iconProps = { ref, name }
  iconProps.style = theme.get(
    'components.icon.icon',
    get(styles, 'icon'),
    styles
  )

  iconProps.color = color || get(iconProps.style, 'color', get(theme, 'typography.default.color'))
  iconProps.size = size || get(iconProps.style, 'fontSize', (get(theme, 'typography.default.fontSize', 15) * 2))

  const Icon = isValidComponent(Element) ? Element : false

  return (
    <View style={ containerStyle } >
      { Icon && <Icon { ...iconProps } />}
    </View>
  )

})

IconWrapper.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  ref: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
}
