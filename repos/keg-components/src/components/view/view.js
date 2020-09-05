import React from 'react'
import { View as RNView } from 'react-native'
import { useClassName } from '../../hooks/useClassName'

export const View = React.forwardRef(({ children, dataSet, className, ...props }, ref) => {

  const viewRef = useClassName(className, dataSet, ref)

  return (
    <RNView
      {...props}
      dataSet={dataSet}
      ref={viewRef}
    >
      { children }
    </RNView>
  )
  
})
