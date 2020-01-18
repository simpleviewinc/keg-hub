/* eslint-disable import/first */
import React from 'react'
import { View } from 'KegView'

export const StoryWrap = props => (
  <View style={ props.style } >
    { props.children }
  </View>
)