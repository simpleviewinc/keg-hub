/* eslint-disable import/first */

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
