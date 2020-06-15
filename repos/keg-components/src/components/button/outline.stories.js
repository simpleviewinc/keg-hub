/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text, View } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const buttonStyle = { width: 125, marginRight: 10 }

storiesOf('Button | Outline', module)
  .add('Standard', () => (
    <StoryWrap style={{ textAlign: 'center' }}>
      <Button
        themePath='button.outline.default'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Default'}
      />

      <Button
        themePath='button.outline.primary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Primary'}
      />

      <Button
        themePath='button.outline.secondary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Secondary'}
      />

      <Button
        themePath='button.outline.warn'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Warning'}
      />

      <Button
        themePath='button.outline.danger'
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
        themePath='button.outline.default'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Default'}
      />

      <Button
        disabled
        themePath='button.outline.primary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Primary'}
      />

      <Button
        disabled
        themePath='button.outline.secondary'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Secondary'}
      />

      <Button
        disabled
        themePath='button.outline.warn'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Warning'}
      />

      <Button
        disabled
        themePath='button.outline.danger'
        styles={{ main: buttonStyle }}
        onClick={action('Button Clicked!')}
        content={'Danger'}
      />
    </StoryWrap>
  ))
