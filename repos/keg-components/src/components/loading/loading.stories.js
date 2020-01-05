/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, Loading } from '../../'

const stories = storiesOf('Loading', module)

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

stories.add('Default', () =>
  <View style={ viewStyles } >
    <Loading text={ 'Loading' } />
  </View>
)
