

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Loading } from '../../'
import { StoryWrap } from 'StoryWrap'

const storyStyles = { textAlign: 'center' }

storiesOf('Loading', module).add('Default', () =>
  <StoryWrap style={ storyStyles } >

    <Loading text={ 'Loading' } />

  </StoryWrap>
)
