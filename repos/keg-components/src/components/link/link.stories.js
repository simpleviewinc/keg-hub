

import React from 'react'
import { storiesOf } from '@storybook/react'
import { A, Link, P } from '../../'
import { StoryWrap } from 'StoryWrap'

const storyStyles = { textAlign: 'center' }

storiesOf('Typography | Link', module)
  .add('Anchor', () =>
    <StoryWrap style={ storyStyles } >

      <A href='https://placegoat.com' target='_blank' >
        Keg Anchor
      </A>

    </StoryWrap>
  )
  .add('Anchor & Space', () =>
    <StoryWrap style={ storyStyles } >

      <P>
        This displays an
        <A href='https://placegoat.com' target='_blank' space={ true } >
          anchor
        </A>
        inside of some text with space around it
      </P>

    </StoryWrap>
  )
  .add('Anchor & No Space', () =>
    <StoryWrap style={ storyStyles } >

      <P>
        This displays an
        <A href='https://placegoat.com' target='_blank' >
          anchor
        </A>
        inside of some text without space around it
      </P>

    </StoryWrap>
  )
  .add('Link', () =>
    <StoryWrap style={ storyStyles } >

      <Link href='https://placegoat.com' target='_blank' >
        Keg Link
      </Link>

    </StoryWrap>
  )