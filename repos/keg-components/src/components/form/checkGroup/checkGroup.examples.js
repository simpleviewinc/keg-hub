import React from 'react'
import { CheckGroup } from './checkGroup'
import { Switch } from 'KegSwitch'
import { action } from '@storybook/addon-actions'

const goats = [ 'Alpine', 'Angora', 'Don', 'Danish Landrace', 'Nigerian Dwarf', 'Russian White' ]
const initialCheckValue = false

export const Basic = () => {
  return (
    <CheckGroup title={'Goats'}>
    { 
      goats.map(breed => 
        <CheckGroup.Item 
          key={breed}
          RightComponent={breed} 
          close={true}
        />
      )
    }
    </CheckGroup>
  )
}

export const SelectAll = () => (
  <CheckGroup 
    title={'Goats'} 
    initChecked={initialCheckValue} 
    onGroupPress={action('header check')} 
    check
  >
    { ({ ref }) =>
        goats.map(breed => <CheckGroup.Item 
          ref={ref}
          key={breed}
          RightComponent={breed} 
          initChecked={initialCheckValue}
          onChange={action(`${breed} toggled`)}
          close
        />)
    }
  </CheckGroup>
)

export const WithSwitch = () => (
  <CheckGroup 
    title={'Goats'} 
    initChecked={initialCheckValue} 
    onGroupPress={action('header check')} 
    check
  >
  { groupProps =>
      goats.map(breed => (
        <Switch 
          key={breed}
          ref={groupProps.ref} 
          RightComponent={breed} 
          onChange={action(`${breed} toggled`)}
          close 
        />
      ))
  }
  </CheckGroup>
)

// defined here to work with the `Props` storybook component
CheckGroup.defaultProps = {
  initChecked: false,
}

export {
  CheckGroup
}