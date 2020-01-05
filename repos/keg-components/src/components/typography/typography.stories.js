/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Caption, H1, H2, H3, H4, H5, H6, P, Subtitle, Text, View } from '../../'

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

storiesOf('Typography', module)
  .add('Caption', () =>
    <View style={ viewStyles } >
      <Caption>
        Keg Caption
      </Caption>
    </View>
  )

storiesOf('Typography', module)
  .add('H1', () =>
    <View style={ viewStyles } >
      <H1>
        Keg H1
      </H1>
    </View>
  )

storiesOf('Typography', module)
  .add('H2', () =>
    <View style={ viewStyles } >
      <H2>
        Keg H2
      </H2>
    </View>
  )

storiesOf('Typography', module)
  .add('H3', () =>
    <View style={ viewStyles } >
      <H3>
        Keg H3
      </H3>
    </View>
  )

storiesOf('Typography', module)
  .add('H4', () =>
    <View style={ viewStyles } >
      <H4>
        Keg H4
      </H4>
    </View>
  )

storiesOf('Typography', module)
  .add('H5', () =>
    <View style={ viewStyles } >
      <H5>
        Keg H5
      </H5>
    </View>
  )

storiesOf('Typography', module)
  .add('H6', () =>
    <View style={ viewStyles } >
      <H6>
        Keg H6
      </H6>
    </View>
  )

storiesOf('Typography', module)
  .add('Paragraph', () =>
    <View style={ viewStyles } >
      <P>
        Keg Paragraph
      </P>
    </View>
  )

storiesOf('Typography', module)
  .add('Subtitle', () =>
    <View style={ viewStyles } >
      <Subtitle>
        Keg Subtitle
      </Subtitle>
    </View>
  )

storiesOf('Typography', module)
  .add('Text', () =>
    <View style={ viewStyles } >
      <Text>
        Keg Text
      </Text>
    </View>
  )