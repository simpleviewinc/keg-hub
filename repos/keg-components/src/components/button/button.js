import React from 'react'
import PropTypes from 'prop-types'
import { get, isNum } from '@keg-hub/jsutils'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { useThemePath } from '../../hooks'
import { useThemeHover, useThemeActive } from '@keg-hub/re-theme'
import { getActiveOpacity, getPressHandler, renderFromType } from '../../utils'
import { useThemeTypeAsClass } from 'KegTypeAsClass'

/**
 * Finds the child type and formats it in the proper type to be rendered
 * @param {Object|Array|string} Children - React components to render
 * @param {Object} props
 * @param {Object} props.styles - Custom styles passed into the component as a prop
 * @param {boolean} props.selectable - whether the text content is selectable or not
 *
 * @returns {React Component|Object|Array}
 */
const getChildren = (Children, { styles, selectable }) => {
  return renderFromType(Children, { style: styles?.content, selectable }, Text)
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
 * @property {Boolean} [props.showFeedback=false] - Should opacity feebBack be shown when the button is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Number=} props.activeOpacity - add opacity value to active state
 * @property {Boolean=} props.disabled - disable button interaction. default false
 * @property {Boolean=} props.selectable - whether the button text is selectable or not. default false
 * @property {Object} props.ref - reference to native element
 *
 */
export const Button = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    content,
    onClick,
    onPress,
    styles,
    showFeedback = false,
    type = 'default',
    themePath,
    activeOpacity,
    disabled = false,
    selectable = false,
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
      disabled={disabled}
      touchRef={themeRef}
      showFeedback={isNum(activeOpacity) || showFeedback}
      style={checkDisabled(themeStyles.main, btnStyles, disabled)}
      children={getChildren(children || content, {
        styles: themeStyles,
        selectable,
      })}
      {...getPressHandler(false, onClick, onPress)}
      {...getActiveOpacity(false, props, btnStyles)}
    />
  )
})

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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  themePath: PropTypes.string,
  selectable: PropTypes.bool,
  activeOpacity: PropTypes.number,
  showFeedback: PropTypes.bool,
}
