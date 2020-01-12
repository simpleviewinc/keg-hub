/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Input, Label, View, Select, Option, Options } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

storiesOf('Form | Form', module)
  .add('Default', () =>
    <StoryWrap>
      <Form name='story-form' >
        <Label>
          Enter Some Text
        </Label>
        <Input />
      </Form>
    </StoryWrap>
  )

storiesOf('Form | Input', module)
  .add('Default', () =>
    <StoryWrap>
      <Input />
    </StoryWrap>
  )

storiesOf('Form | Select', module)
  .add('Default', () =>
    <StoryWrap>
      
      <Select
        onChange={ action("Value Changed!") }
      >
        <Option label='1' value={ 1 } />
        <Option label='2' value={ 2 } />
        <Option label='3' value={ 3 } />
        <Option label='4' value={ 4 } />
      </Select>
    </StoryWrap>
  )