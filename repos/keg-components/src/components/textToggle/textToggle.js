import React, { useState, useMemo, useCallback } from 'react'
import { Text } from '../typography/text'
import { Touchable } from '../touchable'
import { Drawer } from '../drawer'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { isValidComponent } from '../../utils'
import PropTypes from 'prop-types'
import { useStylesCallback } from '@keg-hub/re-theme'
import { LinearGradient } from 'KegLinearGradient'
import { isFunc } from '@keg-hub/jsutils'

/**
 * build the styles object based on togglePosition
 * @param {object} theme
 * @param {object} styleHelper - of the form { togglePosition, styles }
 */
const buildStyles = (theme, styleHelper) => {
  const textToggleStyles = theme.get(`textToggle`, styleHelper?.styles)

  // default right position
  let align = 'flex-end'
  switch (styleHelper?.togglePosition) {
  case 'left':
    align = 'flex-start'
    break
  case 'center':
    align = 'center'
    break
  }
  return theme.get(textToggleStyles, {
    main: {
      alignItems: align,
    },
  })
}

/**
 * TextToggle
 * @param {object} props
 * @param {string} props.text - text to display as the content
 * @param {object=} props.styles
 * @param {boolean=} props.isExpandedInit - whether the content is expanded or not initially
 * @param {string=} props.className
 * @param {Function=} props.onToggle - optional. callback whenever the toggle component is pressed
 * @param {'left'|'center'|'right'=} props.togglePosition - optional. where to position the toggle component. default 'right'
 * @param {Number=} props.collapsedHeight - optional. height of the textview when collapsed
 * @param {Component=} props.CustomToggle - optional toggle component to use instead of the default
 * @param {string=} props.fadeColor - optional color for the fade on collapsed text
 * @param {string=} props.expandedToggleText - optional text for the button when it's expanded
 * @param {string=} props.collapsedToggleText - optional text for the button when it's collapsed
 */
export const TextToggle = props => {
  const {
    text,
    styles,
    isExpandedInit = false,
    className,
    CustomToggle,
    onToggle,
    togglePosition = 'right',
    collapsedHeight = 100,
    fadeColor = 'white',
    collapsedToggleText = 'show more',
    expandedToggleText = 'show less',
  } = props

  if (!text) return null
  const [ expanded, setExpanded ] = useState(isExpandedInit)

  const styleHelper = useMemo(
    () => ({
      styles,
      togglePosition,
    }),
    [ styles, togglePosition ]
  )

  const mainStyle = useStylesCallback(
    buildStyles,
    [ togglePosition, styles ],
    styleHelper
  )

  const [ textMaxHeight, setTextMaxHeight ] = useState(0)

  const showToggle = shouldDisplayToggler(collapsedHeight, textMaxHeight)

  const onToggleCb = useCallback(() => {
    setExpanded(!expanded)
    isFunc(onToggle) && onToggle(!expanded)
  }, [ expanded, onToggle ])

  const onTextLayout = useCallback(
    event => {
      const height = event.nativeEvent.layout.height
      if (textMaxHeight === height) return
      setTextMaxHeight(height)
    },
    [ textMaxHeight, setTextMaxHeight ]
  )

  return (
    <View
      style={[mainStyle.main]}
      className={useClassList('keg-text-toggle', className)}
    >
      <Drawer
        collapsedHeight={collapsedHeight}
        toggled={expanded}
      >
        <Text
          style={mainStyle.text}
          onLayout={onTextLayout}
        >
          { text }
        </Text>
      </Drawer>

      { showToggle && !expanded && (
        <LinearGradient
          colors={[ 'rgba(255,255,255,0)', fadeColor ]}
          style={mainStyle.linearGradient}
        />
      ) }
      { showToggle && (
        <ToggleComponent
          onPress={onToggleCb}
          isExpanded={expanded}
          styles={mainStyle.toggleComponent}
          CustomComponent={CustomToggle}
          collapsedToggleText={collapsedToggleText}
          expandedToggleText={expandedToggleText}
        />
      ) }
    </View>
  )
}

/**
 * only show toggle if user-defined height DNE
 *  or the given text does not fit in the user-defined height
 * @param {number=} minHeight
 * @param {number=} textMaxHeight
 *
 * @return {boolean}
 */
const shouldDisplayToggler = (minHeight, textMaxHeight) => {
  return !minHeight || textMaxHeight > minHeight
}

/**
 * ToggleComponent
 * @param {object} props
 * @param {Function} props.onPress - when the component is pressed
 * @param {object} props.styles
 * @param {Component=} props.CustomComponent - optional Component to override the default text component
 * @param {boolean} props.isExpanded - whether to show expanded state or not
 * @param {string} props.expandedToggleText - optional text for the button when it's expanded
 * @param {string} props.collapsedToggleText - optional text for the button when it's collapsed
 */
const ToggleComponent = ({
  onPress,
  styles,
  CustomComponent,
  isExpanded,
  expandedToggleText,
  collapsedToggleText,
}) => {
  const defaultText = isExpanded ? expandedToggleText : collapsedToggleText

  return (
    <Touchable
      style={styles?.main}
      onPress={onPress}
    >
      { isValidComponent(CustomComponent) ? (
        <CustomComponent isExpanded={isExpanded} />
      ) : (
        <Text style={styles?.text}>{ defaultText }</Text>
      ) }
    </Touchable>
  )
}

TextToggle.propTypes = {
  text: PropTypes.string,
  isExpandedInit: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.string,
  CustomToggle: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
  onToggle: PropTypes.func,
  togglePosition: PropTypes.oneOf([ 'left', 'center', 'right' ]),
  collapsedHeight: PropTypes.number,
  fadeColor: PropTypes.string,
  expandedToggleText: PropTypes.string,
  collapsedToggleText: PropTypes.string,
}
