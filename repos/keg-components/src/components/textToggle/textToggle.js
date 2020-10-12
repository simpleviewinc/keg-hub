import React, { useState, useMemo, useCallback } from 'react'
import { Text, Touchable, ScrollView } from '../'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { isValidComponent } from '../../utils'
import PropTypes from 'prop-types'
import { useStylesCallback } from '@keg-hub/re-theme'

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
  return theme.get(
    textToggleStyles,
    {
      main: {
        alignItems: align
      }
    }
  )
}

/**
 * TextToggle
 * @param {object} props 
 * @param {string} props.text - text to display as the content
 * @param {number=} props.numOfLines - max # of lines before it cuts off until 'show more' is toggled
 * @param {object=} props.styles
 * @param {boolean=} props.isExpandedInit - whether the content is expanded or not initially
 * @param {string=} props.className
 * @param {Component=} props.CustomToggle - optional toggle component to use instead of the default
 * @param {Function=} props.onToggleChange - callback whenever the toggle component is pressed
 * @param {'left'|'center'|'right'=} props.togglePosition - where to position the toggle component. default 'right'
 * 
 */
export const TextToggle = (props) => {
  const {
    text, 
    numOfLines=4, 
    styles, 
    isExpandedInit=false,
    className,
    CustomToggle,
    onToggleChange,
    togglePosition='right'
  } = props
  
  const [expanded, setExpanded] = useState(isExpandedInit)
  const helpers = useMemo(() => ({
    styles,
    togglePosition
  }), [styles, togglePosition])

  const mainStyle = useStylesCallback(
    buildStyles,
    [ togglePosition, styles ],
    helpers
  )
  const onToggleCb = useCallback(() => {
      setExpanded(!expanded)
      onToggleChange && onToggleChange(!expanded)
    },
    [expanded, onToggleChange],
  )
  const numberOfLines = expanded ? 0 : numOfLines

  return (
    <View 
      style={mainStyle.main}
      className={useClassList('keg-text-toggle', className)}
    >
      <ScrollView style={mainStyle.textContainer}>
        <Text
          style={mainStyle.text}
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
      </ScrollView>

      <ToggleComponent 
        onPress={onToggleCb}
        isExpanded={expanded}
        styles={mainStyle.toggleComponent}
        CustomComponent={CustomToggle}
      />
    </View>
  )
}


/**
 * ToggleComponent
 * @param {object} props 
 * @param {Function} props.onPress - when the component is pressed
 * @param {object} props.styles
 * @param {Component=} props.CustomComponent - optional Component to override the default text component
 * @param {boolean} props.isExpanded - whether to show expanded state or not
 */
const ToggleComponent = ({onPress, styles, CustomComponent, isExpanded}) => {
  const defaultText = isExpanded ? 'show less' : 'show more'

  return (
    <Touchable
      style={styles?.main}
      onPress={onPress}
    >
      {
        isValidComponent(CustomComponent)
          ? <CustomComponent isExpanded={isExpanded}/>
          : <Text
              style={styles?.text}
            >
              {defaultText}
            </Text>
      }
      
    </Touchable>
  )
}


TextToggle.propTypes = {
  text: PropTypes.string,
  numOfLines: PropTypes.number,
  isExpanded: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.string,
  CustomToggle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.elementType,
  ]),
  onToggleChange: PropTypes.func,
  togglePosition: PropTypes.oneOf([ 'left', 'center', 'right' ])
}
