import React from 'react'
import { SvgIcon } from './svgIcon'
import { Loading as KegLoading } from '../loading'
import { Animated, Easing } from 'react-native'
import { useFromToAnimation } from 'KegHooks'
import { StoryWrap } from 'StoryWrap'

const wrapStyles = {
  textAlign: 'center',
  flexDirection: 'row',
  marginBottom: 20,
  justifyContent: 'center',
}

export const Basic = props => {
  return (
    <StoryWrap style={wrapStyles}>
      <SvgIcon
        svgFill='none'
        viewBox='0 0 23 23'
        delta='M11.5 23C5.146 23 0 17.854 0 11.5S5.146 0 11.5 0 23 5.146 23 11.5 17.854 23 11.5 23zm5.204-15.266a.868.868 0 00-1.237 0l-5.49 5.635-2.445-2.53a.868.868 0 00-1.236 0 .902.902 0 000 1.265l3.077 3.162a.868.868 0 001.236 0L16.733 9a.931.931 0 00-.03-1.265z'
        fillRule='evenodd'
        clipRule='evenodd'
        {...props}
        style={{
          height: 22,
          width: 22,
        }}
      />
    </StoryWrap>
  )
}

const CustomIndicator = props => {
  const { styles, ...attrs } = props
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
      <SvgIcon
        viewBox='0 0 1664 1728'
        size={40}
        color={'#2196F3'}
        delta='M462 1394q0 53-37.5 90.5T334 1522q-52 0-90-38t-38-90q0-53 37.5-90.5T334 1266t90.5 37.5T462 1394zm498 206q0 53-37.5 90.5T832 1728t-90.5-37.5T704 1600t37.5-90.5T832 1472t90.5 37.5T960 1600zM256 896q0 53-37.5 90.5T128 1024t-90.5-37.5T0 896t37.5-90.5T128 768t90.5 37.5T256 896zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5T1202 1394t37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zM494 398q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5T1536 1024t-90.5-37.5T1408 896t37.5-90.5T1536 768t90.5 37.5T1664 896zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136T832 0t136 56 56 136zm530 206q0 93-66 158.5T1330 622q-93 0-158.5-65.5T1106 398q0-92 65.5-158t158.5-66q92 0 158 66t66 158z'
        {...attrs}
        className={`keg-animated-icon`}
        style={styles.icon}
      />
    </Animated.View>
  )
}

export const Loading = props => {
  return (
    <StoryWrap style={wrapStyles}>
      <KegLoading
        className={'ef-loading'}
        indicator={props => <CustomIndicator {...props} />}
        size={40}
      />
    </StoryWrap>
  )
}

export const WithChildren = () => {
  return (
    <StoryWrap style={wrapStyles}>
      <SvgIcon
        viewBox='0 0 20 20'
        size={20}
        className='keg-svg-children'
      >
        <SvgIcon.Circle
          cx='10'
          cy='10'
          r='10'
          fill='#356C99'
        />
      </SvgIcon>
    </StoryWrap>
  )
}
