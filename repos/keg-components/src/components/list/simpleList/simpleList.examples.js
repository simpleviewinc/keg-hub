import React from 'react'
import { SimpleList } from './simpleList'
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
  {
    title: 'Goat Grub',
    data: [
      'Goats are reputed to be willing to eat almost anything, including tin cans and cardboard boxes.',
      "Goats will chew on anything remotely resembling plant matter to decide if it's to good to eat.",
      'The unusual smells of leftover food in discarded cans or boxes may further stimulate their hunger.',
    ],
  },
]

export const Basic = () => {
  return (
    <div />
  )
}

SimpleListNative.defaultProps = {
}

export { SimpleListNative }
