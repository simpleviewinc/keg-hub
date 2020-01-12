/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Caption, H1, H2, H3, H4, H5, H6, Label, P, Subtitle, Text, View } from '../../'
import { StoryWrap } from 'StoryWrap'

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

storiesOf('Typography | Caption', module)
  .add('Caption', () =>
    <StoryWrap>
      <Caption>
        Keg Caption
      </Caption>
    </StoryWrap>
  )

storiesOf('Typography | H1', module)
  .add('H1', () =>
    <StoryWrap>
      <H1>
        Keg H1
      </H1>
    </StoryWrap>
  )

storiesOf('Typography | H2', module)
  .add('H2', () =>
    <StoryWrap>
      <H2>
        Keg H2
      </H2>
    </StoryWrap>
  )

storiesOf('Typography | H3', module)
  .add('H3', () =>
    <StoryWrap>
      <H3>
        Keg H3
      </H3>
    </StoryWrap>
  )

storiesOf('Typography | H4', module)
  .add('H4', () =>
    <StoryWrap>
      <H4>
        Keg H4
      </H4>
    </StoryWrap>
  )

storiesOf('Typography | H5', module)
  .add('H5', () =>
    <StoryWrap>
      <H5>
        Keg H5
      </H5>
    </StoryWrap>
  )

storiesOf('Typography | H6', module)
  .add('H6', () =>
    <StoryWrap>
      <H6>
        Keg H6
      </H6>
    </StoryWrap>
  )

storiesOf('Typography | Label', module)
  .add('Label', () =>
    <StoryWrap>
      <Label>
        Keg Label
      </Label>
    </StoryWrap>
  )

storiesOf('Typography | Paragraph', module)
  .add('Paragraph', () =>
    <StoryWrap>
      <P>
        Keg Paragraph
      </P>
    </StoryWrap>
  )

storiesOf('Typography | Subtitle', module)
  .add('Subtitle', () =>
    <StoryWrap>
      <Subtitle>
        Keg Subtitle
      </Subtitle>
    </StoryWrap>
  )

storiesOf('Typography | Text', module)
  .add('Text', () =>
    <StoryWrap>
      <Text>
        Keg Text
      </Text>
    </StoryWrap>
  )