/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { P } from '../'
import { Card } from './card'

const stories = storiesOf('Card', module)

stories.add('Default', () =>
  <Card header={ 'Keg Card' }>
    <P>
      Body of the default keg card. This is just some demo text as an example.
    </P>
    <P>
      You can also add am image, with a title and subtitle.
    </P>
  </Card>
)