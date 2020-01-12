/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const stories = storiesOf('Button', module)

stories.add('Default', () =>
  <StoryWrap>
    <Button style={{ width: 150, margin: 'auto' }} onClick={action("Button Clicked!")}>
      <Text>
        Keg Button
      </Text>
    </Button>
  </StoryWrap>
)

stories.add('Disabled', () =>
  <StoryWrap>
    <Button disabled={ true } style={{ width: 150, margin: 'auto' }} onClick={action("Button Clicked!")}>
      <Text>
        Keg Button
      </Text>
    </Button>
  </StoryWrap>
)
