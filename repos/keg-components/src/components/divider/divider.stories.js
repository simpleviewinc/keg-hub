

import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, Divider } from '../../'
import { StoryWrap } from 'StoryWrap'


storiesOf('Display | Divider', module)
  .add('Divider', () =>
    <StoryWrap style={{ paddingTop: 30 }} >

      <Divider />

    </StoryWrap>
  )
