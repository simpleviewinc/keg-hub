import React from 'react'
import { Touchable } from './touchable'
import { Touchable as TouchableNative } from './touchable.native.js'
import { View, H6 } from '../'
import { action } from '@storybook/addon-actions'
import { withTouch } from '../../hocs'
import { Icon as KegIcon } from 'KegIcon'
import { Flag } from '../../assets/icons'

export const Basic = () => {
  return (
    <Touchable onPress={action('Pressed example 1')}>
      <View style={{ textAlign: 'center' }} >
        <H6 style={{ fontWeight: 'bold' }} >
          Click Me
        </H6>
      </View>
    </Touchable>
  )
}

export const WithStates = () => {
  return (
    <Touchable
      onPress={action('Pressed example 2')}
      style={{width: 'fit-content', height: 'fit-content', alignSelf: 'center'}}
      children={
        ({ pressed, hovered }) => {
          
          const text = hovered && pressed 
            ? 'hovered and pressed'
            : hovered
              ? 'hovered'
              : pressed
                ? 'pressed'
                : 'default'

          return (
            <View>
              <H6>
                {text}
              </H6>
            </View>
          )
        }
      }
    />
  )
}

const WithTouchChildren = () => {
  return (
    <View style={{flex:1, flexDirection: 'row'}}>
      <KegIcon
        Component={Flag}
        color={'#2196F3'}
      />
      <H6 style={{alignSelf: 'center', marginLeft: 10}}>
        Some text sample
      </H6>
    </View>
  )
}

export const WithTouchExample = withTouch(WithTouchChildren) 


TouchableNative.defaultProps = {
  disabled: false,
  showFeedback: true,
}

// Re-export the Component with the default props defined to be used in the MDX story
export { TouchableNative }
