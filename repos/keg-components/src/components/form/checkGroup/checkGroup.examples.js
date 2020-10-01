import React from 'react'
import { CheckGroup } from './checkGroup'
import { Switch } from 'KegSwitch'

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
  <CheckGroup title={'Goats'} initChecked={initialCheckValue} check>
    { ({ ref }) =>
        goats.map(breed => <CheckGroup.Item 
          ref={ref}
          key={breed}
          RightComponent={breed} 
          initChecked={initialCheckValue}
          close
        />)
    }
  </CheckGroup>
)

export const WithSwitch = () => (
  <CheckGroup title={'Goats'} initChecked={initialCheckValue} check>
  { groupProps =>
      goats.map(breed => (
        <Switch 
          key={breed}
          ref={groupProps.ref} 
          RightComponent={breed} 
          close 
        />
      ))
  }
  </CheckGroup>
)

export {
  CheckGroup
}