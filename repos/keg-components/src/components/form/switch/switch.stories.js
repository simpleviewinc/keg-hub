/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Switch } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

storiesOf('Form | Switch', module)
  .add('Default', () =>
    <StoryWrap>

      <Switch onChange={ action("Select Change!") } />

    </StoryWrap>
  )