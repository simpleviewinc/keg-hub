import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Text } from '../../'

const stories = storiesOf('Button', module)

stories.add('Default', () =>
  <Button onClick={() => console.log("clicked!!")}>
    <Text>
      Hello Button
    </Text>
  </Button>
)
