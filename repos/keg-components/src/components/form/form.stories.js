/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'
import { 
  Checkbox,
  Form,
  Input,
  Label,
  Option,
  Select,
  Switch,
  Text,
  View
} from '../../'

storiesOf('Form | Form', module)
  .add('Default', () =>
    <StoryWrap>

      <Form name='story-form' >

        <Label>Enter Some Text</Label>
        <Input style={{ marginBottom: 15, width: 200 }} onChange={ action("Input Change!") } />

        <Label>Select A Number</Label>
        <Select style={{ marginBottom: 15, width: 200 }} onChange={ action("Select Change!") }>
          <Option label='1' value={ 1 } />
          <Option label='2' value={ 2 } />
          <Option label='3' value={ 3 } />
          <Option label='4' value={ 4 } />
        </Select>
        
        <Label>Turn Me On</Label>
        <Switch rightText={ 'I\'m a Switch' } />

        <Label>Click Me</Label>
        <Checkbox rightText={ 'I\'m a Checkbox' } />


      </Form>

    </StoryWrap>
  )
