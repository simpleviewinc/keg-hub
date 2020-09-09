import React from 'react'
import { storiesOf } from '@storybook/react'
import { P, H3, Label } from '../'
import { Card } from './card'
import { StoryWrap } from 'StoryWrap'

const wrapStyles = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}
const cardStyles = {
  main: { maxWidth: '300px' },
}

// <Card Header={'Card Header'} styles={cardStyles} >
//   <P>
//     Default card component with some header text.
//   </P>
//   <P>Some text text for the demo to show what the card looks like.</P>
// </Card>
// <Card Footer={'Card Footer'} styles={cardStyles} >
//   <P>
//     Default card component with some footer text.
//   </P>
//   <P>Some text text for the demo to show what the card looks like.</P>
// </Card>
// <Card Header={'Card Header'} Footer={'Card Footer'} styles={cardStyles} >
//   <P>
//     Default card component with some header and text.
//   </P>
//   <P>Some text text for the demo to show what the card looks like.</P>
// </Card>
// <Card
//   Header={(<H3>Custom Header</H3>)}
//   Footer={(<Label style={{ marginBottom: 0 }} >Custom Footer</Label>)}
//   styles={cardStyles}
// >
//   <P>
//     Default card component with custom header and footer components.
//   </P>
//   <P>Some text text for the demo to show what the card looks like.</P>
// </Card>

storiesOf('Display | Card', module).add('No Image', () => (
  <StoryWrap style={wrapStyles}>
    <Card
      Header={<H3>Custom Header</H3>}
      Footer={<Label style={{ marginBottom: 0 }}>Custom Footer</Label>}
      styles={cardStyles}
    >
      <P>Card component with title and subtitle</P>
      <P>Some text text for the demo to show what the card looks like.</P>
    </Card>
  </StoryWrap>
))

// storiesOf('Display | Card', module).add('With Image', () => (
//   <StoryWrap style={wrapStyles}>
//     <Card
//       Header={'Goats in Boats'}
//       image={{ src: 'https://placegoat.com/240/240' }}
//       styles={{ media: { image: { height: 240 }}}}
//     >
//       <P>
//         Goats were one of the first animals to be tamed by humans and were being
//         herded 9,000 years ago. Goats can be taught their name and to come when
//         called.
//       </P>
//     </Card>
//   </StoryWrap>
// ))

// storiesOf('Display | Card', module).add('No Header', () => (
//   <StoryWrap style={wrapStyles}>
//     <Card
//       image={{ src: 'https://placegoat.com/240/240' }}
//       styles={{ media: { image: { height: 240 }}}}
//     >
//       <P>
//         Goats were one of the first animals to be tamed by humans and were being
//         herded 9,000 years ago. Goats can be taught their name and to come when
//         called.
//       </P>
//     </Card>
//   </StoryWrap>
// ))

// storiesOf('Display | Card', module).add('Full', () => (
//   <StoryWrap style={wrapStyles}>
//     <Card
//       Header={'Full Image Width'}
//       Footer={'Card With Footer'}
//       image={{ src: 'https://placegoat.com/240/240' }}
//       styles={{ main: { marginBottom: 30, }, media: { image: { height: 240 } } }}
//       themePath='card.full'
//     >
//       <P>
//         Goats were one of the first animals to be tamed by humans and were being
//         herded 9,000 years ago. Goats can be taught their name and to come when
//         called.
//       </P>
//     </Card>
//   </StoryWrap>
// ))
