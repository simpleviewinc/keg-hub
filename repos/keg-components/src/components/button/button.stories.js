/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const TextComp = props => <Text>Keg Button</Text>
const buttonStyle = { width: 150 }

storiesOf('Button', module)
  .add('Default', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

      <Button 
        style={ buttonStyle }
        onClick={ action("Button Clicked!") }
      >
        <TextComp />
      </Button>

    </StoryWrap>
  )
  .add('Disabled', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

      <Button 
        disabled={ true }
        style={ buttonStyle }
        onClick={ action("Disabled Button Clicked!") }
      >
        <TextComp />
      </Button>

    </StoryWrap>
  )
