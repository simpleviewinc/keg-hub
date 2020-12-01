import React from 'react'
import PropTypes from 'prop-types'
import { get } from '@keg-hub/jsutils'
import { Touchable } from '../touchable'
import {View} from 'KegView'
import { Text } from '../typography/text'
import { useThemePath } from '../../hooks'
import { getActiveOpacity, renderFromType } from '../../utils'
import { useThemeTypeAsClass } from 'KegTypeAsClass'
import {withTouch} from '../../hocs/withTouch'
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
 * ButtonChildren
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props
 * @property {String} props.text - button text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.styles - custom styles
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
const ButtonChildren = (props) => {
  const {
    className,
    children,
    content,
    styles,
    type = 'default',
    themePath,
    hovered,
    pressed,
    ...otherProps
  } = props

  const btnStyles = useThemePath(
    themePath || `button.contained.${type}`,
    styles
  )

  const childStyles = pressed 
    ? btnStyles?.active
    : hovered 
      ? btnStyles?.hover
      : btnStyles?.default

  return (
    <View
      accessibilityRole='button'
      className={useThemeTypeAsClass(
        themePath || type,
        'keg-button',
        className
      )}
      style={[
        checkDisabled(btnStyles?.default?.main, btnStyles, props?.disabled),
        hovered && btnStyles?.hover?.main,
        pressed && btnStyles?.active?.main
      ]}
      {...otherProps}
      {...getActiveOpacity(false, props, btnStyles)}
    >
      {getChildren(children || content, childStyles)}
    </View>
  )
}

/**
 * Button
 * @summary Custom button component. All props are paseed onto `ButtonChildren` component
 *
 * @param {Object} props
 * @property {String} props.text - button text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.styles - custom styles
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
export const Button = withTouch(ButtonChildren)

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
