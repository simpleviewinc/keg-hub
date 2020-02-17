import React from 'react'
import { useTheme, useThemeHover } from 're-theme'
import { useStyles } from '../../hooks'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { Text } from '../typography/text'
import { getActiveOpacity, getPressHandler, renderFromType } from '../../utils'

/**
 * Finds the child type and formats it in the proper type to be rendered
 * @param {Object|Array|string} Children - React components to render
 * @param {Object} theme - Re-Theme Object
 * @param {Object} activeStyle - Current styles based on the state of the element
 * @param {Object} [styles={}] - Custom styles passed into the component as a prop
 *
 * @returns {React Component|Object|Array}
 */
const getChildren = (Children, theme, activeStyle, styles={}) => {
  return renderFromType(Children, { style: theme.join(activeStyle.content, styles.content) }, Text)
}

/**
 * ButtonWrapper
 * @summary Wraps the Passed in element prop
 * @param {Object} props - see PropTypes below
 *
 */
export const ButtonWrapper = props => {
  const theme = useTheme()

  const {
    Element,
    children,
    content,
    disabled,
    danger,
    isWeb,
    onClick,
    onPress,
    outline,
    contained,
    primary,
    ref,
    style,
    styles,
    secondary,
    text,
    type,
    warn,
    ...elProps
  } = props

  const [ btnStyles, setBtnStyles ] = useStyles(
    theme,
    `components.button`,
    [ { type, outline, text, contained }, 'contained' ],
    [ { primary, secondary, warn, danger }, 'default' ]
  )

  const [ hoverRef, activeStyle ] = useThemeHover(
    btnStyles.default,
    btnStyles.hover,
    { ref, noMerge: true }
  )

  return (
    <Element
      elProps={ elProps }
      ref={ hoverRef }
      disabled={ disabled }
      style={ theme.join(
        activeStyle.main,
        styles && get(styles, [ 'button', 'main' ]),
        disabled && get(btnStyles, [ 'disabled', 'main' ]),
        disabled && styles && get(styles, [ 'button', 'disabled' ]),
        style
      )}
      children={ getChildren(children || content, theme, activeStyle, styles) }
      { ...getPressHandler(isWeb, onClick, onPress) }
      { ...getActiveOpacity(isWeb, props, activeStyle) }
    />
  )

}

ButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  content: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  outline: PropTypes.bool,
  ref: PropTypes.object,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.object,
  type: PropTypes.string,
  warn: PropTypes.bool,
}
