import React from 'react'
import { storiesOf } from '@storybook/react'
import { Loading } from '../../'
import { StoryWrap } from 'StoryWrap'
import { View } from '../'

const storyStyles = { textAlign: 'center' }
const viewStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
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
