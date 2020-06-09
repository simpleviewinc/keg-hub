

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Input } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

storiesOf('Form | Input', module)
  .add('Default', () =>
    <StoryWrap>
      <Input onChange={ action("Input Change!") } />
    </StoryWrap>
  )
  .add('On Value Change', () => (
    <StoryWrap>
      <Input onValueChange={ action("Value Change!") } />
      <Input onChangeText={ action("Changed text!") } />
    </StoryWrap>
  ))
  .add('Read only', () => (
    <StoryWrap>
      <Input value="Sorry, I'm read only." readOnly />
    </StoryWrap>
  ))
  .add('Placeholder', () => (
    <StoryWrap>
      <Input placeholder="Type here..." />
    </StoryWrap>
  ))
  .add('On Press', () => (
    <StoryWrap>
      <Input onPress={action('Input clicked')} />
    </StoryWrap>
  ))
  .add('Read only', () => (
    <StoryWrap>
      <Input value="Sorry, I'm read only." readOnly />
    </StoryWrap>
  ))
  .add('Placeholder', () => (
    <StoryWrap>
      <Input placeholder="Type here..." />
    </StoryWrap>
  ))

