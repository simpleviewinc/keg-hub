import { action } from '@storybook/addon-actions'
import { Autocomplete } from './autocomplete'
import { View } from 'KegView'
import { P } from 'KegTypography'
import React from 'react'

const types = [
  'American Pygmy',
  { text: 'American Pygmy', key: '123' },
  'Alpine',
  'Alpine Alternate',
  'Angora',
  'Boer',
  'Don',
  'Danish Landrace',
  'Dandara',
  "Lance's Pet",
  'Nigerian Dwarf',
  'Oberhasli',
  'Orobica',
  'Saanen',
  'Toggenburg',
  'Russian White',
  'Valais Blackneck',
]

export const Basic = () => {
  return (
    <View>
      <P>Start typing to see options</P>
      <Autocomplete
        styles={{
          content: {
            input: { padding: 10 },
            menu: { main: {}, content: {} },
          },
        }}
        onSelect={item => action(`Item selected=${item?.text}`)(item)}
        placeholder='Types of goats'
        values={types}
      />
      <P>Click on an item to select it</P>
    </View>
  )
}
