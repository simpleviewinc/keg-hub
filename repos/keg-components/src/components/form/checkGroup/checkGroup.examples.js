import React, { useRef } from 'react'
import { CheckGroup } from './checkGroup'
import { Switch } from 'KegSwitch'
import { action } from '@storybook/addon-actions'
import { Button } from 'KegButton'

const goats = [
  'Alpine',
  'Angora',
  'Don',
  'Danish Landrace',
  'Nigerian Dwarf',
  'Russian White',
]
const initialCheckValue = false

export const Basic = () => {
  return (
    <CheckGroup title={'Goats'}>
      { goats.map(breed => (
        <CheckGroup.Item
          key={breed}
          RightComponent={breed}
          close={true}
        />
      )) }
    </CheckGroup>
  )
}

export const DisabledHeader = () => {
  return (
    <CheckGroup showHeader={false}>
      { goats.map(breed => (
        <CheckGroup.Item
          key={breed}
          RightComponent={breed}
          close={true}
        />
      )) }
    </CheckGroup>
  )
}

export const SelectAll = () => {
  return (
    <CheckGroup
      title={'Goats'}
      initChecked={initialCheckValue}
      onGroupPress={action('header check')}
      showHeaderCheckbox
    >
      { goats.map(breed => (
        <CheckGroup.Item
          key={breed}
          RightComponent={breed}
          initChecked={initialCheckValue}
          onChange={action(`${breed} toggled`)}
          close
        />
      )) }
    </CheckGroup>
  )
}

export const SelectAllNoArray = () => {
  return (
    <CheckGroup
      title={'Goats'}
      initChecked={initialCheckValue}
      onGroupPress={action('header check')}
      showHeaderCheckbox
    >
      <CheckGroup.Item
        RightComponent={goats[0]}
        initChecked={initialCheckValue}
        onChange={action(`${goats[0]} toggled`)}
        close
      />

      <CheckGroup.Item
        RightComponent={goats[1]}
        initChecked={initialCheckValue}
        onChange={action(`${goats[1]} toggled`)}
        close
      />

      <CheckGroup.Item
        RightComponent={goats[2]}
        initChecked={initialCheckValue}
        onChange={action(`${goats[2]} toggled`)}
        close
      />
    </CheckGroup>
  )
}

export const HeaderRefControl = () => {
  const headerRef = useRef()

  const toggle = () =>
    headerRef.current.setChecked(!headerRef.current.isChecked)

  return (
    <>
      <Button
        styles={{ main: { width: 220, backgroundColor: 'coral', margin: 15 } }}
        onPress={toggle}
      >
        Toggle All (using ref to header)
      </Button>
      <CheckGroup
        ref={headerRef}
        title={'Goats'}
        initChecked={initialCheckValue}
        onGroupPress={action('header check')}
        showHeaderCheckbox
      >
        <CheckGroup.Item
          RightComponent={goats[0]}
          initChecked={initialCheckValue}
          onChange={action(`${goats[0]} toggled`)}
          close
        />

        <CheckGroup.Item
          RightComponent={goats[1]}
          initChecked={initialCheckValue}
          onChange={action(`${goats[1]} toggled`)}
          close
        />

        <CheckGroup.Item
          RightComponent={goats[2]}
          initChecked={initialCheckValue}
          onChange={action(`${goats[2]} toggled`)}
          close
        />
      </CheckGroup>
    </>
  )
}

export const ChildRefControl = () => {
  const ref = useRef({})

  const toggle = () => {
    const { setChecked, isChecked } = ref.current
    setChecked(!isChecked)
  }

  return (
    <>
      <Button
        styles={{ main: { margin: 15, width: 200, backgroundColor: 'green' } }}
        onPress={toggle}
      >
        Toggle it
      </Button>
      <CheckGroup
        title={'Goats'}
        initChecked={initialCheckValue}
        onGroupPress={action('header check')}
        showHeaderCheckbox
      >
        <CheckGroup.Item
          ref={ref}
          RightComponent={goats[0]}
          initChecked={initialCheckValue}
          onChange={action(`${goats[0]} toggled`)}
          close
        />
      </CheckGroup>
    </>
  )
}

export const WithSwitch = () => (
  <CheckGroup
    title={'Goats'}
    initChecked={initialCheckValue}
    onGroupPress={action('header check')}
    showHeaderCheckbox
  >
    { goats.map(breed => (
      <Switch
        key={breed}
        RightComponent={breed}
        onChange={action(`${breed} toggled`)}
        close
      />
    )) }
  </CheckGroup>
)

// defined here to work with the `Props` storybook component
CheckGroup.defaultProps = {
  initChecked: false,
}

export { CheckGroup }
