/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from 'KegIcon'
import { Card } from '../card'
import { StoryWrap } from 'StoryWrap'

const wrapStyles = { textAlign: 'center' }

storiesOf('Display | Icon', module)
  .add('Icon', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'rocket' } color={ "#111111" } size={ 30 } />
    </StoryWrap>
  )