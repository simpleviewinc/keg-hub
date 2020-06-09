

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { StoryWrap, Split } from 'StoryWrap'
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

const inputStyles = { marginBottom: 15, width: 200 }

storiesOf('Form | Form', module)
  .add('Default', () =>
    <StoryWrap>

      <Form name='story-form' >

        <Label>Enter Some Text</Label>
        <Input style={ inputStyles } onChange={ action("Input Change!") } />

        <Split />

        <Label>Select A Number</Label>
        <Select style={ inputStyles } onChange={ action("Select Change!") }>
          <Option label='1' value={ 1 } />
          <Option label='2' value={ 2 } />
          <Option label='3' value={ 3 } />
          <Option label='4' value={ 4 } />
        </Select>

        <Split />

        <Label>Switch Me</Label>
        <Switch style={ inputStyles } close RightComponent={ 'I\'m a Switch' } />

        <Split />

        <Label>Click Me</Label>
        <Checkbox style={ inputStyles } close RightComponent={ 'I\'m a Checkbox' } />

      </Form>

    </StoryWrap>
  )
