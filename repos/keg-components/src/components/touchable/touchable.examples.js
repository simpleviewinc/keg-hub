import React from 'react'
import { Touchable } from './touchable'
import { Touchable as TouchableNative } from './touchable.native.js'
import { View, H6 } from '../'
import { action } from '@storybook/addon-actions'

export const Basic = () => {
  return (
    <Touchable onPress={action('Pressed example 1')}>
      <View style={{ textAlign: 'center' }}>
        <H6 style={{ fontWeight: 'bold' }}>Click Me</H6>
      </View>
    </Touchable>
  )
}

export const WithStates = () => {
  return (
    <Touchable
      onPress={action('Pressed example 2')}
      style={{
        width: 'fit-content',
        height: 'fit-content',
        alignSelf: 'center',
      }}
      children={({ pressed, hovered }) => {
        const text =
          hovered && pressed
            ? 'hovered and pressed'
            : hovered
              ? 'hovered'
              : pressed
                ? 'pressed'
                : 'default'

        return (
          <View>
            <H6 selectable={false}>{ text }</H6>
          </View>
        )
      }}
    />
  )
}

TouchableNative.defaultProps = {
  showFeedback: true,
  activeOpacity: 0.4,
}

// Re-export the Component with the default props defined to be used in the MDX story
export { TouchableNative }
