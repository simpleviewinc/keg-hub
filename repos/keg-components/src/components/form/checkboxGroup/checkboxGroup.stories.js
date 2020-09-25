import React from 'react'
import { storiesOf } from '@storybook/react'
import { CheckboxGroup } from './checkboxGroup'
import { action } from '@storybook/addon-actions'
import { StoryWrap } from 'StoryWrap'

const goats = [ 'Alpine', 'Angora', 'Don', 'Danish Landrace', 'Nigerian Dwarf', 'Russian White' ]

storiesOf('Form/CheckboxGroup', module)
  .add('Default Header', () => {
    return (
      <StoryWrap>
        <CheckboxGroup title={'Goats'}>
          { 
            goats.map(breed => 
              <CheckboxGroup.Item 
                key={breed}
                RightComponent={breed} 
                close={true}
              />
            )
          }
        </CheckboxGroup>
      </StoryWrap>
    )
  })
  .add('Header Checkbox', () => {
    return (
      <StoryWrap>
        <CheckboxGroup title={'Goats'} onGroupPress={action('Select all!')} checked={false}>
          { 
            goats.map(breed => 
              <CheckboxGroup.Item 
                key={breed}
                RightComponent={breed} 
                close={true}
              />
            )
          }
        </CheckboxGroup>
      </StoryWrap>
    )
  })
