import React from 'react'
import { useThemeHover, useThemeActive } from '@simpleviewinc/re-theme'
import { useThemePath } from '../../hooks'
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
const getChildren = (Children, styles = {}) => {
  return renderFromType(Children, { style: styles.content }, Text)
}

const checkDisabled = (mainStyles, btnStyles, disabled) => {
  return disabled
    ? { ...mainStyles, ...get(btnStyles, 'disabled.main') }
    : mainStyles
}

/**
 * ButtonWrapper
 * Wraps the Passed in Element which should be a Button for the platform type
 * @param {Object} props - see PropTypes below
 *
 */
export const ButtonWrapper = props => {
  const {
    Element,
    children,
    content,
    isWeb,
    onClick,
    onPress,
    themePath,
    ref,
    styles,
    ...elProps
  } = props

  const [btnStyles] = useThemePath(
    themePath || 'button.contained.default',
    styles
  )

  const [ hoverRef, hoverStyles ] = useThemeHover(
    get(btnStyles, 'default', {}),
    get(btnStyles, 'hover'),
    { ref, noMerge: true }
  )

  const [ themeRef, themeStyles ] = useThemeActive(
    hoverStyles,
    get(btnStyles, 'active'),
    { ref: hoverRef, noMerge: true }
  )

  return (
    <Element
      {...elProps}
      ref={themeRef}
      style={checkDisabled(themeStyles.main, btnStyles, props.disabled)}
      children={getChildren(children || content, themeStyles)}
      {...getPressHandler(isWeb, onClick, onPress)}
      {...getActiveOpacity(isWeb, props, btnStyles)}
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
  Element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  isWeb: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  themePath: PropTypes.string,
}
