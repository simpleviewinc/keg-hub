

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Section, H6, Divider, P } from '../../'
import { StoryWrap } from 'StoryWrap'


const storyStyles = { textAlign: 'center' }

storiesOf('Display | Section', module)
  .add('Section', () =>
    <StoryWrap style={ storyStyles } >

      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }} >
          This is some text content that is displayed inside of the section.
        </P>
      </Section>

    </StoryWrap>
  )
