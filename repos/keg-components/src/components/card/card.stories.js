

import React from 'react'
import { storiesOf } from '@storybook/react'
import { P, View } from '../'
import { Card } from './card'
import { StoryWrap } from 'StoryWrap'

const wrapStyles = { maxWidth: '300px', margin: 'auto' }

storiesOf('Display | Card', module)
  .add('No Image', () =>
    <StoryWrap style={ wrapStyles } >

      <Card Header={ 'Keg Card' } >
        <P>
          Body of the default keg card. This is just some demo text as an example.
        </P>
        <P>
          You can also add am image, with a title and subtitle.
        </P>
      </Card>

    </StoryWrap>
  )

storiesOf('Display | Card', module)
  .add('With Image', () =>
    <StoryWrap style={ wrapStyles } >

      <Card 
        Header={ 'Goats in Boats' }
        image={{ src: 'https://placegoat.com/240/240' }}
        styles={{ image: { height: 240, width: 240 } }}
      >
        <P>
          Goats were one of the first animals to be tamed by humans and were being herded 9,000 years ago. Goats can be taught their name and to come when called.
        </P>
      </Card>

    </StoryWrap>
  )

storiesOf('Display | Card', module)
  .add('No Header', () =>
    <StoryWrap style={ wrapStyles } >

      <Card
        image={{ src: 'https://placegoat.com/240/240' }}
        styles={{ image: { height: 240, width: 240 } }}
      >
        <P>
          Goats were one of the first animals to be tamed by humans and were being herded 9,000 years ago. Goats can be taught their name and to come when called.
        </P>
      </Card>

    </StoryWrap>
  )

storiesOf('Display | Card', module)
  .add('Full', () =>
    <StoryWrap style={ wrapStyles } >

      <Card
        Header={ 'Full Image Width' }
        image={{ src: 'https://placegoat.com/240/240' }}
        styles={{ image: { height: 240 } }}
        themePath='card.full'
      >
        <P>
          Goats were one of the first animals to be tamed by humans and were being herded 9,000 years ago. Goats can be taught their name and to come when called.
        </P>
      </Card>

    </StoryWrap>
  )
