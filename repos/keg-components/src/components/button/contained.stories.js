/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text, View } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const buttonStyle = { width: 125, marginRight: 10 }

storiesOf('Button | Contained', module)
  .add('Standard', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

        <Button
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
        >
          Default
        </Button>

        <Button
          primary
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
          content={ 'Primary' }
        />

        <Button
          secondary
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
          content={ 'Secondary' }
        >
        </Button>

        <Button
          warn
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
          content={ 'Warning' }
        />

        <Button
          danger
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
          content={ 'Danger' }
        />

    </StoryWrap>
  )
  .add('Disabled', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

        <Button
          disabled
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
        >
          Default
        </Button>

        <Button
          primary
          style={ buttonStyle }
          disabled
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Primary' }
        />

        <Button
          secondary
          disabled
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Secondary' }
        />

        <Button
          warn
          disabled
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Warning' }
        />

        <Button
          danger
          disabled
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Danger' }
        />

    </StoryWrap>
  )
