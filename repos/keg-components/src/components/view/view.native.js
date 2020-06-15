import React from 'react'
import { View as RNView } from 'react-native'

export const View = React.forwardRef(({ children, ...props }, ref) => (
  <RNView
    {...props}
    ref={ref}
  >
    { children }
  </RNView>
))
