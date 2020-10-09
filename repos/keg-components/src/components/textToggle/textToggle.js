import React, { useState } from 'react'
import { Text, Touchable, ScrollView } from '../'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { useThemePath } from '../../hooks'
import { isValidComponent } from '../../utils'
import PropTypes from 'prop-types'

/**
 * @todo
 * @param {object} props 
 */
export const TextToggle = (props) => {
  const {
    text, 
    numOfLines=4, 
    styles, 
    isExpanded=false,
    className,
    CustomToggle,
    onToggleChange
  } = props
  const [expanded, setExpanded] = useState(isExpanded)
  const textToggleStyles = useThemePath(`textToggle`, styles)

  let numberOfLines = expanded ? 0 : numOfLines

  // if there is no max height then it just continues, no scrolling
  return (
    <View 
      style={textToggleStyles.main}
      className={useClassList('keg-text-toggle', className)}
    >
      <ScrollView style={textToggleStyles.textContainer}>
        <Text
          style={textToggleStyles.text}
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
      </ScrollView>

      <ToggleComponent 
        onPress={() => {
          setExpanded(!expanded)
          onToggleChange && onToggleChange(!expanded)
        }}
        isExpanded={expanded}
        styles={textToggleStyles.toggleButton}
        CustomComponent={CustomToggle}
      />
    </View>
  )
}


/**
 * @todo
 * @param {object} props 
 */
const ToggleComponent = ({onPress, styles, CustomComponent, isExpanded}) => {
  const defaultText = isExpanded ? 'show less' : 'show more'

  return (
    <Touchable
      style={styles.main}
      onPress={onPress}
    >
      {
        isValidComponent(CustomComponent)
          ? <CustomComponent isExpanded={isExpanded}/>
          : <Text>
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
  onToggleChange: PropTypes.func
}
