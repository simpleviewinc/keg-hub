/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from 'KegCheckbox'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

storiesOf('Form | Checkbox', module)
  .add('Default', () =>
    <StoryWrap>

      <Checkbox onChange={ action("Select Change!") } />

    </StoryWrap>
  )