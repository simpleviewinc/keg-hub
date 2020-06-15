/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text, View } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const buttonStyle = { width: 125, marginRight: 10, margin: 'auto' }

storiesOf('Button | Text', module)
  .add('Standard', () => (
    <StoryWrap style={{ textAlign: 'center' }}>
      <Button
        themePath='button.text.default'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Default'}
      />

      <Button
        themePath='button.text.primary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Primary'}
      />

      <Button
        themePath='button.text.secondary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Secondary'}
      />

      <Button
        themePath='button.text.warn'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Warning'}
      />

      <Button
        themePath='button.text.danger'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Danger'}
      />
    </StoryWrap>
  ))
  .add('Disabled', () => (
    <StoryWrap style={{ textAlign: 'center' }}>
      <Button
        disabled
        themePath='button.text.default'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Default'}
      />

      <Button
        disabled
        themePath='button.text.primary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Primary'}
      />

      <Button
        disabled
        themePath='button.text.secondary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Secondary'}
      />

      <Button
        disabled
        themePath='button.text.warn'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Warning'}
      />

      <Button
        disabled
        themePath='button.text.danger'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Danger'}
      />
    </StoryWrap>
  ))
