/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, Image, Link } from '../../'

const stories = storiesOf('Image', module)

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

stories.add('Default', () =>
  <View style={ viewStyles } >
    <Image
      style={{ width: 320, height: 320 }}
      src='https://placegoat.com/320/320'
      alt='A Goat'
    />
  </View>
)

stories.add('Image w/ Link', () =>
  <View style={ viewStyles } >
    <Link href='https://placegoat.com' target='_blank' >
      <Image
        style={{ width: 500, height: 250 }}
        src='https://placegoat.com/500/250'
        alt='Another Goat'
      />
    </Link>
  </View>
)
