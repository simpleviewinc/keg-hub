
import React from 'react'
import { storiesOf } from '@storybook/react'
import { FilePicker } from 'KegFilePicker'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'
import { P } from '../typography'

storiesOf('File Picker', module)
  .add('Default', () =>
    <StoryWrap>
      <FilePicker 
        title={'Click here to select a file'} 
        onFilePicked={ action("File selected!") } 
      />
    </StoryWrap>
  )

  .add('As a button only', () =>
    <StoryWrap>
      <FilePicker 
        title={'Click here to select a darn file'}
        showFile={false} 
        onFilePicked={ action("File selected!") }
      />
    </StoryWrap>
  )

  .add('With standard input props', () => 
    <StoryWrap>
      <FilePicker 
        accept='image/*'
        title={'Click here to select an image'}
        onChange={ action("File selected!") } 
      />
    </StoryWrap>
  )

  .add('With children', () => (
    <StoryWrap>
      <FilePicker onFilePicked={ file => action("File selected!", file) }>
        <P>Some additional text here as a child element.</P>
      </FilePicker>
    </StoryWrap>
  ))

  .add('Opening picker on mount', () => (
    <StoryWrap>
      <FilePicker 
        accept='image/*'
        title={'Click here to select an image'}
        onChange={ action("File selected!") } 
        openOnMount
      />
    </StoryWrap>
  ))

  .add('With themes', () => {
    return (
      <StoryWrap>
        {
          [ 'default', 'primary', 'secondary', 'warn', 'danger'].map(type => (
            <FilePicker 
              key={type}
              style={{ marginTop: 10 }}
              buttonThemePath={`button.contained.${type}`} 
              onFilePicked={file => action("File selected!", file)}>
                <P>File picker {type}</P>
            </FilePicker>
          ))
        }
      </StoryWrap>
    )
  })
  
