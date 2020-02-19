/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from 'KegIcon'
import { StoryWrap } from 'StoryWrap'

const wrapStyles = { textAlign: 'center' }

storiesOf('Display | Icon', module)
  .add('Default', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'rocket' } />
    </StoryWrap>
  )
  .add('Color', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'flag' } color={ "#2196F3" } />
    </StoryWrap>
  )
  .add('Size', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'home' } size={ 50 } />
    </StoryWrap>
  )
