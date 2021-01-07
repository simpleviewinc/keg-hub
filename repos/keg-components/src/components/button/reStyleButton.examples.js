/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'
import { Button as KegButton } from './button'
import { reStyle } from '@keg-hub/re-theme/reStyle'

export const Button = reStyle(
  KegButton,
  'styles'
)((theme, props) => {
  return {
    default: {
      main: {
        backgroundColor: 'blue',
      },
    },
    hover: {
      main: {
        backgroundColor: 'green',
      },
    },
  }
})

export const Basic = () => {
  return (
    <Button
      themePath='button.contained.default'
      onClick={action('Button Clicked!')}
      content={'Default'}
    />
  )
}
