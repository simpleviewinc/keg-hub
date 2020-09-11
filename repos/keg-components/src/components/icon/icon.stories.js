import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Icon as KegIcon } from 'KegIcon'
import { TouchableIcon } from './touchableIcon'
import { StoryWrap } from 'StoryWrap'
import { Copy, Home, Flag, Rocket } from '../../assets/icons'

const wrapStyles = { textAlign: 'center' }

storiesOf('Display/Icon', module)
  .add('Default', () => (
    <StoryWrap style={wrapStyles}>
      <KegIcon Component={Rocket} />
    </StoryWrap>
  ))
  .add('Color', () => (
    <StoryWrap style={wrapStyles}>
      <KegIcon
        Component={Flag}
        color={'#2196F3'}
      />
    </StoryWrap>
  ))
  .add('Size', () => (
    <StoryWrap style={wrapStyles}>
      <KegIcon
        Component={Home}
        size={100}
      />
    </StoryWrap>
  ))
  .add('Touchable', () => (
    <StoryWrap style={wrapStyles}>
      <TouchableIcon
        Component={Copy}
        onPress={action('Icon pressed')}
        size={35}
      />
    </StoryWrap>
  ))
