

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Icon } from 'KegIcon'
import { TouchableIcon } from './touchableIcon'
import { StoryWrap } from 'StoryWrap'

const wrapStyles = { textAlign: 'center' }

storiesOf('Display | Icon', module)
  .add('Default', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'rocket' } />
    </StoryWrap>
  )
  .add('Color', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'flag' } color={ "#2196F3" } />
    </StoryWrap>
  )
  .add('Size', () =>
    <StoryWrap style={ wrapStyles } >
      <Icon name={ 'home' } size={ 50 } />
    </StoryWrap>
  )
  .add('Touchable', () =>
    <StoryWrap style={ wrapStyles } >
      <TouchableIcon 
        onPress={action('Icon pressed')}
        name={ 'copy' } 
        size={ 35 } 
      />
    </StoryWrap>
  )
