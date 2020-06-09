
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { TextBox } from './textBox'
import { StoryWrap } from 'StoryWrap'
import { Input } from 'KegInput'
import { View } from 'react-native'

const TextBoxStory = ({type, useClipboard}) => {
  const [ text, setText ] = useState('Your text goes here...')
  return (
    <StoryWrap style={{ paddingTop: 30 }} >
      <View style={{ flexDirection: 'row' }}>

        <Input 
          style={{ margin: 15 }}
          onValueChange={setText}
          placeholder={'Type to fill the box'}
        />

        <TextBox 
          useClipboard={useClipboard}
          themePath={`textBox.${type}.default`}
          text={text}
        />

      </View>
    </StoryWrap>
  )
}

storiesOf('Box | TextBox', module)
  .add('Outlined', () => <TextBoxStory type='outlined' />)
  .add('Clipboard', () => <TextBoxStory type='outlined' useClipboard />)
  .add('Contained', () => <TextBoxStory type='contained' />)

