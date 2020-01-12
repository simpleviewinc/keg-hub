/* eslint-disable import/first */

import React from 'react'
import { View } from 'KegView'

export const StoryWrap = props => {
  return (
    <View
      style={{
        ...{ maxWidth: '80vw', margin: 'auto', marginTop: 30 },
        ...props.style
      }}
    >
      { props.children }
    </View>
  )
}