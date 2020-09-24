import React from 'react'
import { storiesOf } from '@storybook/react'
import { Loading } from '../../'
import { Icon } from 'KegIcon'
import { StoryWrap } from 'StoryWrap'
import { View } from '../'
import { FALoading } from '../../assets/icons'
import { Animated, Easing } from 'react-native'
import { useFromToAnimation } from 'KegHooks'

const storyStyles = { textAlign: 'center' }
const viewStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
}

const CustomIndicator = ({ size }) => {
  const [spinVal] = useFromToAnimation(
    {
      from: 0,
      to: 1,
      duration: 1500,
      loop: true,
      easing: Easing.linear,
    },
    []
  )
  const spinInterpolate = spinVal.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '0deg', '360deg' ],
  })

  return (
    <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
      <Icon
        Component={FALoading}
        color={'#2196F3'}
        size={size}
      />
    </Animated.View>
  )
}

storiesOf('Loading', module)
  .add('Default', () => (
    <StoryWrap style={storyStyles}>
      <View style={viewStyles}>
        <Loading />
        <Loading type={'primary'} />
        <Loading type={'secondary'} />
        <Loading type={'warn'} />
        <Loading type={'danger'} />
      </View>
    </StoryWrap>
  ))
  .add('Small', () => (
    <StoryWrap style={storyStyles}>
      <View style={viewStyles}>
        <Loading size={'small'} />
        <Loading
          size={'small'}
          type={'primary'}
        />
        <Loading
          size={'small'}
          type={'secondary'}
        />
        <Loading
          size={'small'}
          type={'warn'}
        />
        <Loading
          size={'small'}
          type={'danger'}
        />
      </View>
    </StoryWrap>
  ))
  .add('Custom', () => (
    <StoryWrap style={storyStyles}>
      <View style={viewStyles}>
        <Loading
          indicator={CustomIndicator}
          size={40}
        />
      </View>
    </StoryWrap>
  ))
