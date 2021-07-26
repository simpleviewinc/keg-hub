import React, { useState } from 'react'
import { NavList } from './navList'
import { ChevronDown } from 'KegIcons/chevronDown'
import { NavList as NavListNative } from './navList.native.js'

const basicItems = {
  basicNav: {
    type: 'BasicNav',
    group: 'Basic Nav',
    Icon: ChevronDown,
    items: [
      {title: `Item 1`, uuid: 1},
      {title: `Item 2`, uuid: 2},
      {title: `Item 3`, uuid: 3}
    ]
  }
}

const externalToggleItems = {
  navTest: {
    type: 'ExternalToggle',
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

const noHeaderStyles = {
  header: {
    default: {
      main: { borderTopWidth: 0 },
      title: { fontSize: 14 }
    },
    active: {
      main: { borderBottomWidth: 0 }
    }
  }
}

export const Basic = props => {
  return (<NavList {...props} />)
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

export const TopLevelOnly = () => {
  return (
    <NavList
      items={itemsOnly}
      styles={noHeaderStyles}
    />
  )
}


NavListNative.defaultProps = {
  className: 'keg-nav-list',
  items: [],
  styles: {},
  drawer: false,
  header: true,
  headerToggle: true,
  headerProps: {},
  iconProps: {},
  onHeaderPress: () => {},
  onItemPress: () => {},
  renderHeader: () => {},
  renderItem: () => {},
  drawerProps: {},
}

console.log(NavListNative)

export { NavListNative }
