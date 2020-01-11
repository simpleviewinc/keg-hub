/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Input, Text, View, Select } from '../../'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Form | Input', module)
  .add('Default', () =>
    <View style={{ maxWidth: '100vw', margin: 'auto', marginTop: 30,  textAlign: 'center' } } >
      <Input />
    </View>
  )


storiesOf('Form | Select', module)
  .add('Default', () =>
    <View style={{ maxWidth: '100vw', margin: 'auto', marginTop: 30,  textAlign: 'center' } } >
      <Select />
    </View>
  )