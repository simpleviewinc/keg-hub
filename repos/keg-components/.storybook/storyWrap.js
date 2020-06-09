import React from 'react'
import { View } from 'KegView'


const splitStyle = {
  margin: '30px 0',
  borderTopWidth: 1,
  borderTopColor: '#dddddd',
  borderTopStyle: 'solid',
}

export const Split = props => (
  <View style={{ ...splitStyle, ...props.style }} />
)

export const StoryWrap = props => (
  <View style={ props.style } >
    { props.children }
  </View>
)