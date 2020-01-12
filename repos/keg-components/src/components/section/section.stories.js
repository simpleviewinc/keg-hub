/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Section, H6, Divider } from '../../'
import { StoryWrap } from 'StoryWrap'


const sectionStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

storiesOf('Display | Section', module)
  .add('Section', () =>
    <StoryWrap>
      <Section style={ sectionStyles } >
        <H6>This is a Section!</H6>
        <Divider />
      </Section>
    </StoryWrap>
  )
