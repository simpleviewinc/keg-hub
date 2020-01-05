/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Section, H6, Divider } from '../../'

const stories = storiesOf('Section', module)

const sectionStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

stories.add('Default', () =>
  <Section style={ sectionStyles } >
    <H6>This is a Section!</H6>
    <Divider />
  </Section>
)
