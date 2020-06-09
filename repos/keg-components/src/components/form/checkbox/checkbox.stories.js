

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Switch, Checkbox } from '../../'
import { View } from 'KegView'
import { action } from '@storybook/addon-actions'
import { StoryWrap, Split } from 'StoryWrap'

storiesOf('Form | Checkbox', module)
  .add('Default', () =>
    <StoryWrap>
      <Checkbox onChange={ action("Checkbox Click!") } />
    </StoryWrap>
  )
  .add('Custom', () =>
    <StoryWrap>
      <Checkbox SwitchComponent={ <Switch onChange={ action("Switch Click!") } /> } />
    </StoryWrap>
  )
  .add('Side Text', () =>
    <StoryWrap>
      <Checkbox LeftComponent="Left Text" onChange={ action("Checkbox Click!") } />
      <Split />
      <Checkbox RightComponent="Right Text" onChange={ action("Checkbox Click!") } />
      <Split />
      <Checkbox 
        LeftComponent="Left Text"
        RightComponent="Right Text"
        onChange={ action("Checkbox Click!") }
      />
    </StoryWrap>
  )
  .add('Close Text', () =>
    <StoryWrap>
      <Checkbox close LeftComponent="Left Text" onChange={ action("Checkbox Click!") } />
      <Split />
      <Checkbox close RightComponent="Right Text" onChange={ action("Checkbox Click!") } />
      <Split />
      <Checkbox 
        close
        LeftComponent="Left Text"
        RightComponent="Right Text"
        onChange={ action("Checkbox Click!") }
      />
    </StoryWrap>
  )