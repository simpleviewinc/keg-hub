import React, { useState } from 'react'
import { Button, Section, H4, Divider, View, Text, Image } from '../../'
import { Modal } from './modal'
import { StoryWrap } from 'StoryWrap'
import { action } from '@storybook/addon-actions'
import { Animated } from 'react-native'
import { AppHeader } from '../'
import { useFromToAnimation } from 'KegHooks'

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
const demoViewStyle = { flexDirection: 'row', justifyContent: 'center' }
const modalBtnStyle = {
  main: { margin: 10, paddingLeft: 15, paddingRight: 15 },
}

const AnimatedComp = ({
  defaultStyle,
  visible,
  children,
  onAnimationFinish,
}) => {
  const [animValue] = useFromToAnimation({
    useNativeDriver: false,
    from: visible ? 1200 : 0,
    to: visible ? 0 : 1200,
    duration: 1000,
    onFinish: onAnimationFinish,
  })

  const rotate = animValue.interpolate({
    useNativeDriver: false,
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

const DemoContent = ({ title, children }) => {
  return (
    <View>
      <Section style={{ borderWidth: 0 }}>
        <H4 style={{ marginBottom: 10 }}>{ title }</H4>
        <Divider />
        <Text style={{ marginTop: 20 }}>
          Click the buttons below to toggle the modal
        </Text>
        { children }
      </Section>
    </View>
  )
}

export const SingleModal = props => {
  const [ modalIndex, setModalIndex ] = useState(0)

  return (
    <StoryWrap style={storyStyles}>
      <DemoContent title={`Modal Toggle`}>
        <View style={demoViewStyle}>
          <Button
            themePath='button.contained.primary'
            styles={modalBtnStyle}
            onClick={() => setModalIndex(1)}
            content={'Toggle Modal 1'}
          />
          <Button
            themePath='button.contained.secondary'
            styles={modalBtnStyle}
            onClick={() => setModalIndex(2)}
            content={'Toggle Modal 2'}
          />
        </View>
      </DemoContent>
      <Modal
        visible={modalIndex === 1}
        onBackdropTouch={() => {
          setModalIndex(0)
          action('Touched outside of modal 1')
        }}
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
            onClick={() => {
              setModalIndex(0)
              action('GOT IT Clicked!')
            }}
            content={'GOT IT'}
          />
        </View>
      </Modal>
      <Modal
        visible={modalIndex === 2}
        onBackdropTouch={() => {
          setModalIndex(0)
          action('Touched outside of modal 2')
        }}
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
            onClick={() => {
              setModalIndex(0)
              action('OK Clicked!')
            }}
            content={'OK'}
          />
        </View>
      </Modal>
    </StoryWrap>
  )
}

export const ModalInception = props => {
  const [ modal1, setModal1 ] = useState(false)
  const [ modal2, setModal2 ] = useState(false)

  return (
    <StoryWrap style={storyStyles}>
      <DemoContent title={`Modal Inception`}>
        <View style={demoViewStyle}>
          <Button
            themePath='button.contained.primary'
            styles={modalBtnStyle}
            onClick={() => setModal1(true)}
            content={'Toggle First Modal'}
          />
        </View>
      </DemoContent>
      <Modal
        visible={modal1}
        onBackdropTouch={() => {
          setModal1(false)
          action('Touched outside of modal 1')
        }}
        styles={{
          content: {
            width: '600px',
            height: 300,
            justifyContent: 'center',
          },
        }}
      >
        <Text>This modal opens another modal</Text>
        <View style={demoViewStyle}>
          <Button
            themePath='button.contained.secondary'
            styles={modalBtnStyle}
            onClick={() => setModal2(true)}
            content={'Open Another Modal'}
          />
        </View>
      </Modal>

      <Modal
        visible={modal2}
        onBackdropTouch={() => {
          setModal2(false)
          action('Touched outside of modal 2')
        }}
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
            onClick={() => {
              action('OK Clicked!')
              setModal2(false)
            }}
            content={'OK'}
          />
        </View>
      </Modal>
    </StoryWrap>
  )
}

export const StyleOverride = props => {
  const [ modal1, setModal1 ] = useState(false)

  return (
    <StoryWrap style={storyStyles}>
      <DemoContent title={`Style Override`}>
        <View style={demoViewStyle}>
          <Button
            themePath='button.contained.primary'
            styles={modalBtnStyle}
            onClick={() => setModal1(true)}
            content={'Toggle Modal'}
          />
        </View>
      </DemoContent>
      <Modal
        styles={modalOverrideStyle}
        visible={modal1}
        onBackdropTouch={() => {
          action('Touched outside of modal')
          setModal1(false)
        }}
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
          <Text style={{ paddingLeft: 25, textAlign: 'left' }}>
            This modal has a custom backdrop color and custom container styling
          </Text>
        </View>
      </Modal>
    </StoryWrap>
  )
}

export const CustomAnimation = props => {
  const [ modalVisible, setModalVisible ] = useState(false)

  return (
    <StoryWrap style={storyStyles}>
      <DemoContent title={`Custom Animation`}>
        <View style={demoViewStyle}>
          <Button
            themePath='button.contained.primary'
            styles={modalBtnStyle}
            onClick={() => setModalVisible(true)}
            content={'Toggle Modal'}
          />
        </View>
      </DemoContent>
      <Modal
        styles={modal2Style}
        AnimatedComponent={AnimatedComp}
        visible={modalVisible}
        onBackdropTouch={() => {
          action('Touched outside of modal')
          setModalVisible(false)
        }}
        onAnimateIn={action('Animated In callback')}
        onAnimateOut={action('Animated out callback')}
      >
        <Text>Override with custom animation!</Text>
      </Modal>
    </StoryWrap>
  )
}
