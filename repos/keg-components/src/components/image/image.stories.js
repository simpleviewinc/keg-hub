/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { StoryWrap } from 'StoryWrap'
import { Image, Link } from '../../'

const wrapStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30,  textAlign: 'center' }

storiesOf('Display | Image', module)
  .add('Image', () =>
    <StoryWrap style={ wrapStyles } >
      <Image
        style={{ width: 320, height: 320 }}
        src='https://placegoat.com/320/320'
        alt='A Goat'
      />
    </StoryWrap>
  )

storiesOf('Display | Image', module)
  .add('Image w/ Link', () =>
    <StoryWrap style={ wrapStyles } >
      <Link href='https://placegoat.com' target='_blank' >
        <Image
          style={{ width: 500, height: 250 }}
          src='https://placegoat.com/500/250'
          alt='Another Goat'
        />
      </Link>
    </StoryWrap>
  )
