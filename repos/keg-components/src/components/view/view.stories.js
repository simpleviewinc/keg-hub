/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { StoryWrap } from 'StoryWrap'
import { View, H6 } from '../../'

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

storiesOf('Display | View', module)
  .add('Default', () =>
    <StoryWrap>
      <View style={ viewStyles } >
        <H6>This is a View!</H6>
      </View>
    </StoryWrap>
  )
