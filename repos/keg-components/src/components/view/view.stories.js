

import React from 'react'
import { storiesOf } from '@storybook/react'
import { StoryWrap } from 'StoryWrap'
import { View, P } from '../../'

const storyStyles = { textAlign: 'center' }

storiesOf('Display | View', module)
  .add('Default', () =>
    <StoryWrap style={ storyStyles } >

      <View>
        <P>This is a View!</P>
      </View>

    </StoryWrap>
  )
