/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text, View } from '../../'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Button', module)

stories.add('Default', () =>
  <View style={{ maxWidth: '100vw', margin: 'auto', marginTop: 30,  textAlign: 'center' } } >
    <Button style={{ width: 150, margin: 'auto' }} onClick={action("Button Clicked!!")}>
      <Text>
        Keg Button
      </Text>
    </Button>
  </View>
)

stories.add('Disabled', () =>
  <View style={{ maxWidth: '100vw', margin: 'auto', marginTop: 30,  textAlign: 'center' } } >
    <Button disabled={ true } style={{ width: 150, margin: 'auto' }} onClick={action("Button Clicked!!")}>
      <Text>
        Keg Button
      </Text>
    </Button>
  </View>
)
