/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Section, H6, Divider } from '../../'
import { StoryWrap } from 'StoryWrap'


const storyStyles = { textAlign: 'center' }

storiesOf('Display | Section', module)
  .add('Section', () =>
    <StoryWrap style={ storyStyles } >
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
      </Section>
    </StoryWrap>
  )
