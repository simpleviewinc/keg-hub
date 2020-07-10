import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Section, H6, Divider, P } from '../../'
import { Modal } from './modal'
import { StoryWrap } from 'StoryWrap'
import { action } from '@storybook/addon-actions'
import { Animated } from 'react-native'

const storyStyles = { textAlign: 'center' }
const buttonStyle = { width: 125, marginRight: 10 }
const modalOverrideStyle = {
  content: {
    backgroundColor: 'yellow',
    width: '400px',
    borderRadius: 40,
    height: 200,
    justifyContent: 'center',
  },
  backdrop: { backgroundColor: 'rgba(1,1,1,0.5)' },
}

const CustomComponent = ({ children }) => {
  const [ animated, setAnimated ] = useState(false)
  let slideVal = new Animated.Value(0)

  useEffect(() => {
    Animated.timing(slideVal, {
      toValue: 1,
      duration: 1000,
    }).start(() => setAnimated(true))
  }, [])

  const rotate = slideVal.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '0deg', '360deg' ],
  })

  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        zIndex: 999999,
        width: 600,
        height: 500,
        transform: animated ? null : [{ rotateZ: rotate }],
        justifyContent: 'center',
      }}
    >
      { children }
    </Animated.View>
  )
}

storiesOf('Display | Modal', module)
  .add('Standard', () => (
    <StoryWrap style={storyStyles}>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Modal
        visible={true}
        onBackdropTouch={action('Touched outside of modal')}
      >
        <P>
          Body of the default Modal. This is just some demo text as an example.
        </P>
        <Button
          themePath='button.contained.primary'
          styles={{ main: buttonStyle }}
          onClick={action('Button Clicked!')}
          content={'Primary'}
        />
        <Button
          themePath='button.contained.primary'
          styles={{ main: buttonStyle }}
          onClick={action('Button Clicked!')}
          content={'Primary'}
        />
        <Button
          themePath='button.contained.primary'
          styles={{ main: buttonStyle }}
          onClick={action('Button Clicked!')}
          content={'Primary'}
        />
        <Button
          themePath='button.contained.primary'
          styles={{ main: buttonStyle }}
          onClick={action('Button Clicked!')}
          content={'Primary'}
        />
      </Modal>
    </StoryWrap>
  ))
  .add('Style Override', () => (
    <StoryWrap style={storyStyles}>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Modal
        styles={modalOverrideStyle}
        visible={true}
        onBackdropTouch={action('Touched outside of modal')}
      >
        <P>
          Body of the default Modal. This is just some demo text as an example.
        </P>
        <Button
          themePath='button.contained.primary'
          styles={{ main: buttonStyle }}
          onClick={action('Button Clicked!')}
          content={'Primary'}
        />
      </Modal>
    </StoryWrap>
  ))
  .add('Custom Animation', () => (
    <StoryWrap style={storyStyles}>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Modal
        visible={true}
        onBackdropTouch={action('Touched outside of modal')}
        ModalContainer={CustomComponent}
      >
        <P>This has a custom animation!</P>
      </Modal>
    </StoryWrap>
  ))
