/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text, View } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const buttonStyle = { width: 125, marginRight: 10 }

storiesOf('Button | Text', module)
  .add('Standard', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

        <Button
          text
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
        >
          Default
        </Button>

        <Button
          text
          primary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Primary' }
        />

        <Button
          text
          secondary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Secondary' }
        />

        <Button
          text
          warn
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Warning' }
        />

        <Button
          text
          danger
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Danger' }
        />

    </StoryWrap>
  )
  .add('Disabled', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

        <Button
          disabled
          text
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
        >
          Default
        </Button>

        <Button
          disabled
          text
          primary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Primary' }
        />

        <Button
          disabled
          text
          secondary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Secondary' }
        />

        <Button
          disabled
          text
          warn
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Warning' }
        />

        <Button
          disabled
          text
          danger
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Danger' }
        />

    </StoryWrap>
  )
