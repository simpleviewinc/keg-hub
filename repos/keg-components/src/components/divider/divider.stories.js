/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, Divider } from '../../'
import { StoryWrap } from 'StoryWrap'

const stories = storiesOf('Divider', module)

stories.add('Default', () =>
  <StoryWrap style={{ paddingTop: 30 }} >
    <Divider />
  </StoryWrap>
)
