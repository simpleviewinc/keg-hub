import React from 'react'
import { withTheme } from '@simpleviewinc/re-theme'
import { Text } from '../../typography/text'
import { CheckboxWrapper } from './checkbox.wrapper'

const Element = withTheme(props => {
  const {
    theme,
    style,
    wrapper,
    children,
    onClick,
    onPress,
    text,
    ...args
  } = props

  return (
    <Text
      {...args}
      style={{}}
    >
      { text }
    </Text>
  )
})

export const Checkbox = props => (
  <CheckboxWrapper
    {...props}
    elType={'checkbox'}
    Element={Element}
    isWeb={true}
  />
)

Checkbox.propTypes = { ...CheckboxWrapper.propTypes }
