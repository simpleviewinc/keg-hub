

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Caption, H1, H2, H3, H4, H5, H6, Label, P, Subtitle, Text, View } from '../../'
import { StoryWrap } from 'StoryWrap'

const storyStyles = { textAlign: 'center' }

storiesOf('Typography | Caption', module)
  .add('Caption', () =>
    <StoryWrap style={ storyStyles } >

      <Caption>
        Keg Caption
      </Caption>

    </StoryWrap>
  )

storiesOf('Typography | H1', module)
  .add('H1', () =>
    <StoryWrap style={ storyStyles } >

      <H1>
        Keg H1
      </H1>

    </StoryWrap>
  )

storiesOf('Typography | H2', module)
  .add('H2', () =>
    <StoryWrap style={ storyStyles } >

      <H2>
        Keg H2
      </H2>

    </StoryWrap>
  )

storiesOf('Typography | H3', module)
  .add('H3', () =>
    <StoryWrap style={ storyStyles } >

      <H3>
        Keg H3
      </H3>

    </StoryWrap>
  )

storiesOf('Typography | H4', module)
  .add('H4', () =>
    <StoryWrap style={ storyStyles } >

      <H4>
        Keg H4
      </H4>

    </StoryWrap>
  )

storiesOf('Typography | H5', module)
  .add('H5', () =>
    <StoryWrap style={ storyStyles } >

      <H5>
        Keg H5
      </H5>

    </StoryWrap>
  )

storiesOf('Typography | H6', module)
  .add('H6', () =>
    <StoryWrap style={ storyStyles } >

      <H6>
        Keg H6
      </H6>

    </StoryWrap>
  )

storiesOf('Typography | Label', module)
  .add('Label', () =>
    <StoryWrap style={ storyStyles } >

      <Label>
        Keg Label
      </Label>

    </StoryWrap>
  )

storiesOf('Typography | Paragraph', module)
  .add('Paragraph', () =>
    <StoryWrap style={ storyStyles } >

      <P>
        Keg Paragraph
      </P>

    </StoryWrap>
  )

storiesOf('Typography | Subtitle', module)
  .add('Subtitle', () =>
    <StoryWrap style={ storyStyles } >

      <Subtitle>
        Keg Subtitle
      </Subtitle>

    </StoryWrap>
  )

storiesOf('Typography | Text', module)
  .add('Text', () =>
    <StoryWrap style={ storyStyles } >

      <Text>
        Keg Text
      </Text>

    </StoryWrap>
  )
  .add('Ellipsis', () =>
    <StoryWrap style={ storyStyles } >
        <Text ellipsis>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
    </StoryWrap>
  )