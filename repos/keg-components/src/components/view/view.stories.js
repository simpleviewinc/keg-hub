/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, H6, Divider } from '../../'

const stories = storiesOf('View', module)

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

stories.add('Default', () =>
  <View style={ viewStyles } >
    <H6>This is a View!</H6>
    <Divider />
  </View>
)
