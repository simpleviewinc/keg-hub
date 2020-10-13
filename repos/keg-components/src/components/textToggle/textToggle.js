import React, { useState, useMemo, useCallback } from 'react'
import { Text, Touchable } from '../'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { isValidComponent } from '../../utils'
import PropTypes from 'prop-types'
import { useStylesCallback } from '@keg-hub/re-theme'
import LinearGradient from 'react-native-web-linear-gradient'

/**
 * build the styles object based on togglePosition
 * @param {object} theme
 * @param {object} helpers - of the form { togglePosition, styles }
 */
const buildStyles = (theme, helpers) => {
  const textToggleStyles = theme.get(`textToggle`, helpers?.styles)

  // default right position
  let align = 'flex-end'
  switch (helpers?.togglePosition) {
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
 * @param {Function=} props.onToggleChange - optional. callback whenever the toggle component is pressed
 * @param {'left'|'center'|'right'=} props.togglePosition - optional. where to position the toggle component. default 'right'
 * @param {Number=} props.collapsedHeight - optional. height of the textview when collapsed. takes precedence over minHeightPercentage
 * @param {Number=} props.collapsedHeightPercentage - optional. sets the collapsed height based on percentage of the full text height
 * @param {Component=} props.CustomToggle - optional toggle component to use instead of the default
 */
export const TextToggle = props => {
  const {
    text,
    styles,
    isExpandedInit = false,
    className,
    CustomToggle,
    onToggleChange,
    togglePosition = 'right',
    collapsedHeight,
    collapsedHeightPercentage = 0.5,
  } = props

  const [ expanded, setExpanded ] = useState(isExpandedInit)
  const helpers = useMemo(
    () => ({
      styles,
      togglePosition,
    }),
    [ styles, togglePosition ]
  )

  const mainStyle = useStylesCallback(
    buildStyles,
    [ togglePosition, styles ],
    helpers
  )
  const onToggleCb = useCallback(() => {
    setExpanded(!expanded)
    onToggleChange && onToggleChange(!expanded)
  }, [ expanded, onToggleChange ])
  const [ helper, setHelper ] = useState({
    textParentStyles: { height: 0 },
    textMaxHeight: null,
  })
  const showToggle = shouldDisplayToggler(collapsedHeight, helper.textMaxHeight)
  return (
    <View
      style={[mainStyle.main]}
      className={useClassList('keg-text-toggle', className)}
    >
      <View
        style={[ mainStyle.textContainer, !expanded && helper.textParentStyles ]}
      >
        <Text
          style={mainStyle.text}
          onLayout={useCallback(
            event =>
              onTextLayout(
                event,
                collapsedHeight,
                collapsedHeightPercentage,
                helper,
                setHelper
              ),
            [ collapsedHeight, collapsedHeightPercentage, helper, setHelper ]
          )}
        >
          { text }
        </Text>
        { showToggle && !expanded && (
          <LinearGradient
            colors={[ 'rgba(255,255,255,0)', 'white' ]}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 25,
            }}
          />
        ) }
      </View>
      { showToggle && (
        <ToggleComponent
          onPress={onToggleCb}
          isExpanded={expanded}
          styles={mainStyle.toggleComponent}
          CustomComponent={CustomToggle}
        />
      ) }
    </View>
  )
}

/**
 * Helper for the Text onLayout event
 *
 * @param {object} event
 * @param {number|null} collapsedHeight
 * @param {number} collapsedHeightPercentage
 * @param {object} helper
 * @param {Function} setHelper
 */
const onTextLayout = (
  event,
  collapsedHeight,
  collapsedHeightPercentage,
  helper,
  setHelper
) => {
  const height = event.nativeEvent.layout.height
  const collapsedHt = collapsedHeight || height * collapsedHeightPercentage
  if (helper.textParentStyles.height === collapsedHt) return

  setHelper({
    textParentStyles: {
      height: collapsedHt,
      overflow: 'hidden',
    },
    textMaxHeight: height,
  })
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
 */
const ToggleComponent = ({ onPress, styles, CustomComponent, isExpanded }) => {
  const defaultText = isExpanded ? 'show less' : 'show more'

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
  numOfLines: PropTypes.number,
  isExpandedInit: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.string,
  CustomToggle: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
  onToggleChange: PropTypes.func,
  togglePosition: PropTypes.oneOf([ 'left', 'center', 'right' ]),
}
