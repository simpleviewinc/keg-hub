import React from 'react'
import { View as RNView } from 'react-native'

export const View = ({ children, ...props }) => (
  <RNView { ...props } >
    { children }
  </RNView>
)