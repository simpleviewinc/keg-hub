import React from 'react'
import { View as RNView } from 'react-native'
import { useClassName } from '../../hooks/useClassName'

export const View = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const viewRef = useClassName('keg-view', className, ref)

    return (
      <RNView
        {...props}
        ref={viewRef}
      >
        { children }
      </RNView>
    )
  }
)
