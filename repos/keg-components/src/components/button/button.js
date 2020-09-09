import React from 'react'
import PropTypes from 'prop-types'
import { get } from '@keg-hub/jsutils'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { useThemePath } from '../../hooks'
import { useThemeHover, useThemeActive } from '@keg-hub/re-theme'
import { getActiveOpacity, getPressHandler, renderFromType } from '../../utils'
import { useThemeTypeAsClass } from 'KegTypeAsClass'

/**
 * Finds the child type and formats it in the proper type to be rendered
 * @param {Object|Array|string} Children - React components to render
 * @param {Object} theme - Re-Theme Object
 * @param {Object} activeStyle - Current styles based on the state of the element
 * @param {Object} [styles={}] - Custom styles passed into the component as a prop
 *
 * @returns {React Component|Object|Array}
 */
const getChildren = (Children, styles = {}) => {
  return renderFromType(Children, { style: styles.content }, Text)
}

const checkDisabled = (mainStyles, btnStyles, disabled) => {
  return disabled
    ? { ...mainStyles, ...get(btnStyles, 'disabled.main') }
    : mainStyles
}

/**
 * Button
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {String} props.text - button text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
export const Button = props => {
  const {
    className,
    children,
    content,
    onClick,
    onPress,
    ref,
    styles,
    type = 'default',
    themePath,
    ...elProps
  } = props

  const btnStyles = useThemePath(
    themePath || `button.contained.${type}`,
    styles
  )

  const [ hoverRef, hoverStyles ] = useThemeHover(
    get(btnStyles, 'default', {}),
    get(btnStyles, 'hover'),
    { ref }
  )

  const [ themeRef, themeStyles ] = useThemeActive(
    hoverStyles,
    get(btnStyles, 'active'),
    { ref: hoverRef }
  )

  return (
    <Touchable
      accessibilityRole='button'
      className={useThemeTypeAsClass(
        themePath || type,
        'keg-button',
        className
      )}
      {...elProps}
      ref={themeRef}
      style={checkDisabled(themeStyles.main, btnStyles, props.disabled)}
      children={getChildren(children || content, themeStyles)}
      {...getPressHandler(false, onClick, onPress)}
      {...getActiveOpacity(false, props, btnStyles)}
    />
  )
}

Button.propTypes = {
  ...Touchable.propTypes,
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
  Touchable: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  themePath: PropTypes.string,
}
