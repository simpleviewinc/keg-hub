import React from 'react'
import { SwitchWrapper } from '../switch/switch.wrapper'
import { View } from 'KegView'
import { Text } from 'KegText'

const Element = React.forwardRef(({ elProps, styles, ...props }, ref) => {
  return (
    <View style={ styles.wrapper }>
      <View style={ styles.area }></View>
      <View style={ styles.indicator } ></View>
      <input
        { ...elProps }
        { ...props }
        type='checkbox'
        ref={ ref }
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          margin: 0,
          opacity: 0,
          cursor: 'pointer',
        }}
      />
    </View>
  )
})

export const Checkbox = props => (
  <SwitchWrapper
    styleId={ `keg-web-checkbox` }
    { ...props }
    type={ 'checkbox' }
    Element={ Element }
    isWeb={ true }
  />
)
