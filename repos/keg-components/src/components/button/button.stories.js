/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const TextComp = props => <Text>Keg Button</Text>

storiesOf('Button', module)
  .add('Default', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

      <Button 
        style={{ width: 150 }}
        onClick={action("Button Clicked!")}
      >
        <TextComp />
      </Button>

    </StoryWrap>
  )
  .add('Disabled', () =>
    <StoryWrap style={{ textAlign: 'center' }} >

      <Button 
        disabled={ true }
        style={{ width: 150 }}
        onClick={action("Button Clicked!")}
      >
        <TextComp />
      </Button>

    </StoryWrap>
  )
