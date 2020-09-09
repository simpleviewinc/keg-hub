import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { isValidComponent } from '../../utils'
import { useThemePath } from 'KegHooks'
import { renderFromType } from '../../utils'

/**
 * Icon
 * @summary Custom Icon component
 *
 * @param {Object} props - see Icon.propTypes
 * @property {String} props.color - color of the Icon
 * @property {String} props.name - name of the Icon
 * @property {Function} props.onPress - function to do when image is pressed
 * @property {Object} props.ref - reference to native element
 * @property {String|Number} props.size - size of the Icon
 * @property {Object} props.styles - custom styles
 * @property {string} props.type - Type of icons to use
 * @property {String} props.Element - the icon set component to use
 */
export const Icon = React.forwardRef((props, ref) => {
  const theme = useTheme()
  const {
    color,
    Component,
    Element = Component,
    name,
    size,
    styles,
    themePath,
    type = 'default',
    ...attrs
  } = props

  if (!isValidComponent(Element))
    return (
      console.error(`Invalid Element passed to Icon component!`, Element) ||
      null
    )

  const iconStyles = useThemePath(themePath || `icon.${type}`, styles)

  const iconProps = {
    ref,
    name,
    style: iconStyles.icon,
    color:
      color ||
      iconStyles.color ||
      get(iconStyles, 'icon.color') ||
      get(theme, 'typography.default.color'),
    size: parseInt(
      size ||
        get(iconStyles, 'icon.fontSize') ||
        get(theme, 'typography.default.fontSize', 15) * 2,
      10
    ),
  }

  return (
    <View style={iconStyles.container}>
      { renderFromType(Element, { ...attrs, ...iconProps }) }
    </View>
  )
})

Icon.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  Element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  color: PropTypes.string,
  name: PropTypes.string,
  ref: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  type: PropTypes.string,
}
