import React, { useState } from 'react'
import { Text, Touchable, ScrollView } from '../'
import { View } from 'KegView'
import { useTheme } from '@keg-hub/re-theme'
import { useClassList } from 'KegClassList'
import { useThemePath } from '../../hooks'
import { Animated } from 'react-native'

export const TextToggle = (props) => {
  const {
    text, 
    numOfLines=4, 
    styles, 
    isExpanded=false,
    className
  } = props
  const [expanded, setExpanded] = useState(isExpanded)
  const textToggleStyles = useThemePath(`textToggle`, styles)

  let numberOfLines = numOfLines
  let btnText = 'show more'
  if (expanded) {
    numberOfLines = 0
    btnText = 'show less'
  }

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

      <Touchable
        style={textToggleStyles.toggleButton.main}
        onPress={() => setExpanded(!expanded)}
      >
        <Text>
          {btnText}
        </Text>
      </Touchable>
    </View>
  )
}

const ToggleButton = ({onPress, styles, btnText}) => {
  return (
    <Touchable
      style={styles.main}
      onPress={onPress}
    >
      <Text>
        {btnText}
      </Text>
    </Touchable>
  )
}