/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { A, Link, View } from '../../'

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

storiesOf('Typography | Link', module)
  .add('Anchor', () =>
    <View style={ viewStyles } >
      <A href='https://placegoat.com' target='_blank' >
        Keg Anchor
      </A>
    </View>
  )
  .add('Typography | Link', () =>
    <View style={ viewStyles } >
      <Link href='https://placegoat.com' target='_blank' >
        Keg Link
      </Link>
    </View>
  )