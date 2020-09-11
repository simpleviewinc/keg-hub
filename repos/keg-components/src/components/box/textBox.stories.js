import React, { useState, useEffect, useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { TextBox } from './textBox'
import { StoryWrap } from 'StoryWrap'
import { Input } from 'KegInput'
import { View } from 'react-native'

const TextBoxStory = ({ type, useClipboard }) => {
  const [ text, setText ] = useState('Your text goes here...')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
    if (text !== 'Your text goes here...') inputRef.current.value = text
  }, [text])

  return (
    <StoryWrap style={{ paddingTop: 30 }}>
      <View style={{ flexDirection: 'row' }}>
        <Input
          ref={inputRef}
          style={{ margin: 15, width: 200 }}
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

storiesOf('Box/TextBox', module)
  .add('Outlined', () => <TextBoxStory type='outlined' />)
  .add('Clipboard', () => <TextBoxStory
    type='outlined'
    useClipboard
  />)
  .add('Contained', () => <TextBoxStory type='contained' />)
