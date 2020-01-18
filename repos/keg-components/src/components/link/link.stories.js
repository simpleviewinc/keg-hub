/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { A, Link } from '../../'
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
  .add('Typography | Link', () =>
    <StoryWrap style={ storyStyles } >

      <Link href='https://placegoat.com' target='_blank' >
        Keg Link
      </Link>

    </StoryWrap>
  )