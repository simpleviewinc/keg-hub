import React, { useState } from 'react'
import { NavList } from './navList'
import { H6 } from '../../typography/h6'
import { Text } from '../../typography/text'
import { Caption } from '../../typography/caption'
import { ChevronDown } from 'KegIcons'
import { NavList as NavListNative } from './navList.native.js'

const basicItems = {
  basicNav: {
    group: 'Basic Nav',
    Icon: ChevronDown,
    items: [
      {title: `Item 1`, uuid: 1},
      {title: `Item 2`, uuid: 2},
      {title: `Item 3`, uuid: 3}
    ],
    title: (
      <>
        Basic Nav
        <Caption
          style={{
            marginLeft: 10,
            textAlign: 'right',
            color: `#AFAFAF`
          }}
        >
          - ( click to toggle open )
        </Caption>
      </>
    )
  }
}

const externalToggleItems = {
  navTest: {
    group: 'External Toggle',
    Icon: ChevronDown,
    items: [
      {title: `Nav Item 1`, uuid: 1},
      {title: `Nav Item 2`, uuid: 2},
      {title: `Nav Item 3`, uuid: 3}
    ]
  }
}

const itemsOnly = [
  {title: `Item 1`, uuid: 1},
  {title: `Item 2`, uuid: 2},
  {title: `Item 3`, uuid: 3}
]

const splitStyles = {
  header: {
    default: {
      main: { borderTopWidth: 0 },
    },
    active: {
      main: { borderBottomWidth: 0 }
    }
  }
}

export const Basic = props => {
  return (<NavList {...props} items={basicItems} />)
}

export const ExternalToggle = () => {
  const [toggled, setToggled] = useState(true)
  return (
    <NavList
      items={externalToggleItems}
      toggled={toggled}
      onHeaderPress={() => setToggled(!toggled)}
    />
  )
}

export const HeaderOnly = () => {
  return (
    <NavList
      items={itemsOnly}
      styles={splitStyles}
    />
  )
}

export const NoHeader = () => {
  return (
    <NavList
      header={false}
      items={itemsOnly}
    />
  )
}


NavListNative.defaultProps = {
  className: 'keg-nav-list',
  items: [],
  styles: {},
  header: true,
  headerToggle: true,
  headerProps: {},
  iconProps: {},
  onHeaderPress: () => {},
  onItemPress: () => {},
  drawerProps: {},
}

export { NavListNative }
