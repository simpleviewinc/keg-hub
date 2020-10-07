import React, { useState } from 'react'
import { Text, Touchable, ScrollView } from '../'
import { View } from 'KegView'

export const TextToggle = ({text, numOfLines=4, styles, isExpanded=false}) => {
  const [expanded, setExpanded] = useState(isExpanded)

  let numberOfLines = numOfLines
  let btnText = 'show more'
  if (expanded) {
    numberOfLines = 0
    btnText = 'show less'
  }

  // if there is no max height then it just continues, no scrolling
  return (
    <View style={{}}>
      <ScrollView style={{maxHeight: 200}}>
        <Text
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
      </ScrollView>
      <Touchable
        onPress={() => setExpanded(!expanded)}
      >
        <Text>
          {btnText}
        </Text>
      </Touchable>
    </View>
  )
}