

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Switch, Checkbox } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap, Split } from 'StoryWrap'

storiesOf('Form | Switch', module)
  .add('Default', () =>
    <StoryWrap>
      <Switch onChange={ action("Switch Click!") } />
    </StoryWrap>
  )
  .add('Custom', () =>
    <StoryWrap>
      <Switch SwitchComponent={ <Checkbox onChange={ action("Checkbox Click!") } /> } />
    </StoryWrap>
  )
  .add('Side Text', () =>
    <StoryWrap>
      <Switch LeftComponent="Left Text" onChange={ action("Switch Click!") } />
      <Split />
      <Switch RightComponent="Right Text" onChange={ action("Switch Click!") } />
      <Split />
      <Switch
        LeftComponent="Left Text"
        RightComponent="Right Text"
        onChange={ action("Switch Click!") }
      />
    </StoryWrap>
  )
  .add('Close Text', () =>
    <StoryWrap>
      <Switch close LeftComponent="Left Text" onChange={ action("Switch Click!") } />
      <Split />
      <Switch close RightComponent="Right Text" onChange={ action("Switch Click!") } />
      <Split />
      <Switch
        close
        LeftComponent="Left Text"
        RightComponent="Right Text"
        onChange={ action("Switch Click!") }
      />
    </StoryWrap>
  )
