import { ScrollableSelect } from './scrollableSelect'
import { View } from 'KegView'
import { TextInput as Input } from 'react-native'
import { P } from 'KegTypography'
import React from 'react'

const colors = [
  'Red',
  'Blue',
  'Green',
  'Black',
  'Sand',
  'Gray',
  'Orange',
  'Yellow',
  'Purple',
  'Brown',
  'Tan',
  'Violet',
  'Silver',
]

export const BasicExample = ({ height = 150 }) => (
  <ScrollableSelect
    height={height}
    visible={true}
    items={colors.map(clr => ({ text: clr }))}
    onSelect={({ text }) => console.log('selected ', text)}
  />
)

export const AdjustableHeight = () => {
  const [ height, setHeight ] = React.useState(30)

  return (
    <View>
      <P>Height:</P>
      <Input
        type='number'
        onChangeText={value => setHeight(parseInt(value) ?? 150)}
        placeholder={height}
      />
      <View>
        <ScrollableSelect
          height={height}
          visible={true}
          items={colors.map(clr => ({ text: clr }))}
          onSelect={({ text }) => console.log('selected ', text)}
        />
      </View>
    </View>
  )
}
