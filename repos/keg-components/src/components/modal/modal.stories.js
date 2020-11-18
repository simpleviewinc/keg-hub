import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Section, H6, Divider, P, View, Text, Image } from '../../'
import { Modal } from './modal'
import { StoryWrap } from 'StoryWrap'
import { action } from '@storybook/addon-actions'
import { Animated } from 'react-native'
import { button, withKnobs } from '@storybook/addon-knobs'
import { AppHeader } from '../'
import { useFromToAnimation } from 'KegHooks'

const DemoContent = () => {
  return (
    <View>
      <Section>
        <H6>This is a Section!</H6>

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
    </View>
  )
}
const storyStyles = { textAlign: 'center' }
const modalOverrideStyle = {
  content: {
    width: '400px',
    borderRadius: 40,
    height: 350,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdrop: { backgroundColor: 'rgba(130, 206, 206,0.5)' },
}
const appHeaderStyles = {
  container: { maxHeight: 50 },
  center: {
    content: {
      title: {
        color: 'white',
        fontWeight: 'bold',
      },
    },
  },
}
const modal2Style = {
  content: {
    width: '400px',
    height: 200,
    justifyContent: 'center',
  },
}

const TestComp = ({ defaultStyle, visible, children, onAnimationFinish }) => {
  const [animValue] = useFromToAnimation({
    from: visible ? 1200 : 0,
    to: visible ? 0 : 1200,
    duration: 1000,
    onFinish: onAnimationFinish,
  })

  const rotate = animValue.interpolate({
    inputRange: [ 0, 1200 ],
    outputRange: [ '0deg', '360deg' ],
  })

  return (
    <Animated.View
      style={{
        ...defaultStyle,
        transform: [{ rotateZ: rotate }, { translateX: animValue }],
      }}
    >
      { children }
    </Animated.View>
  )
}

let isVisible1 = false
let isVisible2 = false
storiesOf('Components/Display/Modal', module)
  .addDecorator(withKnobs)
  .add('One at a time', () => {
    // allow only 1 modal on the screen at a time
    const toggleModal = index => {
      switch (index) {
      case 1:
        isVisible1 = !isVisible1
        if (isVisible2 && isVisible1) isVisible2 = false
        return
      case 2:
        isVisible2 = !isVisible2
        if (isVisible2 && isVisible1) isVisible1 = false
        return
      }
    }
    button('toggle modal 1', () => toggleModal(1))
    button('toggle modal 2', () => toggleModal(2))

    return (
      <StoryWrap style={storyStyles}>
        <DemoContent />
        <Modal
          visible={isVisible1}
          onBackdropTouch={action('Touched outside of modal 1')}
          styles={modal2Style}
        >
          <View style={{ flex: 1 }}>
            <AppHeader
              title={'Modal 1'}
              styles={appHeaderStyles}
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text>Modal 1 content</Text>
            </View>
            <Button
              themePath='button.contained.secondary'
              styles={{
                main: { alignSelf: 'start', width: '100%', borderRadius: 0 },
              }}
              onClick={action('OK Clicked!')}
              content={'GOT IT'}
            />
          </View>
        </Modal>
        <Modal
          visible={isVisible2}
          onBackdropTouch={action('Touched outside of modal 2')}
          styles={modal2Style}
        >
          <View style={{ flex: 1 }}>
            <AppHeader
              title={'Modal 2'}
              styles={appHeaderStyles}
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text>Modal 2 content</Text>
            </View>
            <Button
              themePath='button.contained.secondary'
              styles={{
                main: { alignSelf: 'start', width: '100%', borderRadius: 0 },
              }}
              onClick={action('OK Clicked!')}
              content={'OK'}
            />
          </View>
        </Modal>
      </StoryWrap>
    )
  })
  .add('multiple modals', () => {
    const [ modal1, setModal1 ] = useState(false)
    const [ modal2, setModal2 ] = useState(false)

    button('toggle modal 1', () => setModal1(!modal1))
    button('toggle modal 2', () => setModal2(!modal2))
    return (
      <StoryWrap style={storyStyles}>
        <DemoContent />
        <Modal
          visible={modal1}
          onBackdropTouch={action('Touched outside of modal 2')}
          styles={{
            content: {
              width: '600px',
              height: 300,
              justifyContent: 'center',
            },
          }}
        >
          <P> This modal goes behind modal 2 </P>
        </Modal>

        <Modal
          visible={modal2}
          onBackdropTouch={action('Touched outside of modal 2')}
          styles={{
            content: {
              width: '400px',
              height: 200,
              flex: 1,
              borderRadius: 4,
              overflow: 'hidden',
            },
          }}
        >
          <View style={{ flex: 1 }}>
            <AppHeader
              title={'Modal 2'}
              styles={appHeaderStyles}
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text>Hey this modal goes above modal 1</Text>
            </View>
            <Button
              themePath='button.contained.secondary'
              styles={{
                main: { alignSelf: 'start', width: '100%', borderRadius: 0 },
              }}
              onClick={action('OK Clicked!')}
              content={'OK'}
            />
          </View>
        </Modal>
      </StoryWrap>
    )
  })
  .add('Style Override', () => {
    const [ modal1, setModal1 ] = useState(true)
    button('toggle modal', () => setModal1(!modal1))
    return (
      <StoryWrap style={storyStyles}>
        <DemoContent />
        <Modal
          styles={modalOverrideStyle}
          visible={modal1}
          onBackdropTouch={action('Touched outside of modal')}
        >
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Image
              styles={{
                resizeMode: 'contain',
                padding: 10,
                height: 80,
                width: 230,
                alignSelf: 'center',
              }}
              src='https://www.trilogyed.com/blog/wp-content/uploads/2020/07/simpleview_primary-696x110.png'
              alt='A Goat'
            />
            <Divider />
            <P style={{ paddingLeft: 25, textAlign: 'left' }}>
              This modal has a custom backdrop color and custom container
              styling
            </P>
          </View>
        </Modal>
      </StoryWrap>
    )
  })
  .add('Custom Animated Component', () => {
    const [ modalVisible, setModalVisible ] = useState(true)
    button('toggle modal', () => setModalVisible(!modalVisible))

    return (
      <StoryWrap style={storyStyles}>
        <DemoContent />
        <Modal
          styles={modal2Style}
          AnimatedComponent={TestComp}
          visible={modalVisible}
          onBackdropTouch={action('Touched outside of modal')}
          onAnimateIn={action('Animated In callback')}
          onAnimateOut={action('Animated out callback')}
        >
          <P>Override with custom animation!</P>
        </Modal>
      </StoryWrap>
    )
  })
