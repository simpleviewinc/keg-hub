import { ScrollableSelect } from './scrollableSelect.web'
import { View } from 'KegView'
import { TextInput as Input } from 'react-native'
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


export const BasicExample = ({ height=150 }) =>
  <ScrollableSelect
    height={height}
    visible={true}
    items={colors.map(clr => ({ text: clr }))}
    onSelect={({text}) => console.log('selected ', text)}
  />

export const AdjustableHeight = () => {

  const [ height, setHeight ] = React.useState(30)

  console.log({ height })

  return (
    <View>
      <p>Height:</p>
      <Input 
        type='number'
        onChangeText={value => setHeight(parseInt(value) ?? 150)} 
        placeholder={height}
      />
      <View>
        <ScrollableSelect
          height={height}
          visible={true}
          styles
          items={colors.map(clr => ({ text: clr }))}
          onSelect={({text}) => console.log('selected ', text)}
        />
      </View>
    </View>
  )
}