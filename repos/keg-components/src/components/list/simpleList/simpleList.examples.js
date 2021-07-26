import React from 'react'
import { SimpleList } from './simpleList'
import { ChevronDown } from 'KegIcons/chevronDown'
import { SimpleList as SimpleListNative } from './simpleList.native.js'

const goatData = [
  {
    title: 'Goat of Olde',
    data: [
      'Goats are among the earliest animals domesticated by humans.',
      'Early Farmers began to herd wild goats primarily for easy access to milk and meat.',
      'Goat hide has been used for holding water, covering wine bottles and even parchment.',
    ],
  },
  {
    title: 'Goat Bio',
    data: [
      'Most goats have two horns, and are used for defense, dominance, and territoriality.',
      'Goats are well know for their full beards, which is where term goatee is derived from.',
      'Goats have horizontal, slit-shaped pupils the are usually pale in color.',
    ],
  },
]

const listItems = {
  grub: {
    type: 'grub',
    group: 'Goat Grub',
    Icon: ChevronDown,
    toggled: false,
    items: [
      {
        title: `Test 1`,
        uuid: 1,
        // actions: [
        //   {
        //     name: 'Action',
        //     key: `action-test1`,
        //     iconProps: {
        //       size: 12,
        //       Component: Copy,
        //     },
        //   }
        // ]
      },
      {
        title: `Test 2`,
        uuid: 2,
      },
      {
        title: `Test 3`,
        uuid: 3,
      }
    ]
  }
}

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

export const Basic = () => {
  return (
    <SimpleList items={listItems} />
  )
}

export const NoChildren = () => {
  const { items } = listItems.grub
  return (
    <SimpleList
      items={items}
      styles={noHeaderStyles}
    />
  )
}


SimpleListNative.defaultProps = {
}

export { SimpleListNative }
