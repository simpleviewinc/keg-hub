import React, { useRef, useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { StoryWrap } from 'StoryWrap'
import { Image, Link, Text } from '../../'

const wrapStyles = { textAlign: 'center' }

storiesOf('Components/Display/Image', module)
  .add('Image', () => (
    <StoryWrap style={wrapStyles}>
      <Image
        styles={{ width: 320, height: 320 }}
        src='https://placegoat.com/320/320'
        alt='A Goat'
      />
    </StoryWrap>
  ))
  .add('Image w/ Ref', () => {
    const ref = useRef(null)
    const [ isSet, setIsSet ] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setIsSet(ref.current !== null)
      }, 300)
    }, [ref])

    return (
      <StoryWrap style={wrapStyles}>
        <Image
          ref={ref}
          styles={{ width: 500, height: 250 }}
          src='https://placegoat.com/500/250'
          alt='Another Goat'
        />
        <Text>Ref is set: { isSet.toString() } </Text>
      </StoryWrap>
    )
  })
  .add('Image w/ Link', () => (
    <StoryWrap style={wrapStyles}>
      <Link
        href='https://placegoat.com'
        target='_blank'
      >
        <Image
          styles={{ width: 500, height: 250 }}
          src='https://placegoat.com/500/250'
          alt='Another Goat'
        />
      </Link>
    </StoryWrap>
  ))
