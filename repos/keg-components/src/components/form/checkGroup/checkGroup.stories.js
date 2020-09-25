import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { CheckGroup } from './checkGroup'
import { StoryWrap } from 'StoryWrap'
import { Switch } from 'KegSwitch'

const goats = [ 'Alpine', 'Angora', 'Don', 'Danish Landrace', 'Nigerian Dwarf', 'Russian White' ]

storiesOf('Form/CheckGroup', module)
  .add('Without select-all', () => {
    return (
      <StoryWrap>
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
      </StoryWrap>
    )
  })
  .add('With select-all checkbox', () => {
    const initialCheckValue = true
    return (
      <StoryWrap>
        <CheckGroup title={'Goats'} initChecked={initialCheckValue} check>
          { groupProps =>
              goats.map(breed => <CheckGroup.Item 
                key={breed}
                RightComponent={breed} 
                setCheckedSetter={groupProps.setCheckedSetter}
                initChecked={initialCheckValue}
                close
              />)
          }
        </CheckGroup>
      </StoryWrap>
    )
  })
  .add('With any checkable component', () => {
    const initialCheckValue = false
    return (
      <StoryWrap>
        <CheckGroup title={'Goats'} initChecked={initialCheckValue} check>
          { ({ setCheckedSetter }) =>
              goats.map(breed => {
                const [ value, setValue ] = useState(initialCheckValue)
                React.useEffect(() => void setCheckedSetter(setValue), [ setValue ])
                return (
                  <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <input type='radio' checked={value} onChange={setValue}></input>
                    <p>{ breed }</p>
                  </div>
                )
              })
          }
        </CheckGroup>
      </StoryWrap>
    )
  })
