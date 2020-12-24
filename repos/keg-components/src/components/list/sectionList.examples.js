import React from 'react'
import { SectionList } from './sectionList'
import { SectionList as SectionListNative } from './sectionList.native.js'
import { View, H5, H3, P, Divider } from '../'

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
    <SectionList
      sections={goatData}
      renderListHeader={() => (
        <View>
          <H3>Story of the Goat</H3>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={{ marginTop: 20 }}>
          <H5>{ section.title }</H5>
          <Divider />
        </View>
      )}
      renderItem={({ item }) => {
        return (
          <View style={{ marginBottom: 5 }}>
            <P>{ item }</P>
          </View>
        )
      }}
    />
  )
}

SectionListNative.defaultProps = {
  sectionChangeOffset: 10,
  scrollCooldown: 2000,
  sections: [],
  styles: {},
  themePath: 'list.section.default',
  type: 'default',
}

export { SectionListNative }
