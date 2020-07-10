import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { useThemeWithHeight } from 'KegHooks'
import { View } from 'KegView'
import { noOp } from 'KegUtils'
import { Dimensions } from 'react-native'
import { get } from 'jsutils'
import { isValidComponent } from 'KegUtils'

/**
 * Modal wrapper to allow caller to pass in custom animation and styles
 * @param {object} props
 * @param {Component} props.ModalContainer custom component with its own animation and styles
 * @param {Object} props.modalStyles default modal styles used if no ModalContainer is passed in
 * @param {Component} props.children children components
 */
const DefaultAnimationView = ({ ModalContainer, modalStyles, children }) => {
  if (isValidComponent(ModalContainer))
    return <ModalContainer>{ children }</ModalContainer>

  // use the state to keep track of whether the modal has animated yet
  const [ animated, setAnimated ] = useState(false)
  let slideVal = new Animated.Value(0)

  // Set default duration; second argument is empty array so animation function
  // only runs on initial render; when finished with animation, call setAnimated to set flag to true
  useEffect(() => {
    Animated.timing(slideVal, {
      toValue: 1,
      duration: 500,
    }).start(() => setAnimated(true))
  }, [])

  // get modal style default height to set initial animation offset
  const animationOffset =
    get(modalStyles, 'content.height', Dimensions.get('window').height) / 2
  const slideUp = slideVal.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ Dimensions.get('window').height + animationOffset, 0 ],
  })

  return (
    <Animated.View
      style={{
        ...modalStyles.content,
        transform: animated ? null : [{ translateY: slideUp }],
      }}
    >
      { children }
    </Animated.View>
  )
}

/**
 * Simple popup modal using fixed positioning.
 * @param {Object} props
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Object} props.styles - styles object which overrides default theme styles
 * @param {Function} props.onBackdropTouch - the function to execute when the user selects/touches outside the modal; defaults to noOp
 * @param {Component} props.children - the component(s) to render inside the modal
 * @param {String} props.themePath - path to a theme file containing the following properties:
 *  - main: styles for the modal
 *  - backdrop: styles for the background behind the modal
 * @param {String} props.type - type of modal (points to styles in theme file with that type); default is 'default'
 * @param {Number} props.activeOpacity - changes opacity of background when touched/clicked; default is 1
 * @param {Component} props.ModalContainer - pass a custom component to completely override the modal content
 */
export const Modal = props => {
  if (!props.visible) return null

  const {
    styles,
    onBackdropTouch = noOp,
    themePath,
    type = 'default',
    activeOpacity = 1,
  } = props

  const [modalStyles] = useThemeWithHeight(
    themePath || `modal.${type}`,
    styles,
    'main'
  )

  return (
    <View style={modalStyles.main}>
      <TouchableOpacity
        style={modalStyles.backdrop}
        onPressOut={onBackdropTouch}
        activeOpacity={activeOpacity}
      />
      <DefaultAnimationView
        modalStyles={modalStyles}
        {...props}
      />
    </View>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  styles: PropTypes.object,
  onBackdropTouch: PropTypes.func,
  ModalContainer: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
}
