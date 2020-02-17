/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text, View } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const buttonStyle = { width: 125, marginRight: 10 }

storiesOf('Button | Outline', module)
  .add('Standard', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

        <Button
          outline
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
        >
          Default
        </Button>

        <Button
          outline
          primary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Primary' }
        />

        <Button
          outline
          secondary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Secondary' }
        />

        <Button
          outline
          warn
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Warning' }
        />

        <Button
          outline
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
          outline
          style={ buttonStyle }
          onClick={ action("Button Clicked!") }
        >
          Default
        </Button>

        <Button
          disabled
          outline
          primary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Primary' }
        />

        <Button
          disabled
          outline
          secondary
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Secondary' }
        />

        <Button
          disabled
          outline
          warn
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Warning' }
        />

        <Button
          disabled
          outline
          danger
          style={ buttonStyle }
          onClick={ action("Disabled Button Clicked!") }
          content={ 'Danger' }
        />

    </StoryWrap>
  )