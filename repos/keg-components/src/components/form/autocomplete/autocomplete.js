import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { get } from '@keg-hub/jsutils'
import { useAutocompleteItems } from 'KegHooks'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { ScrollableSelect } from '../scrollable/select/scrollableSelect.web'
import { TextInput } from 'react-native'
import { View } from 'KegView'
import { getPlatform } from 'KegGetPlatform'

const AutocompleteInput = reStyle(TextInput)((theme, props) => ({
  ...props.styles,
  ...props.style,
}))

/**
 * Returns the text value from the event object in an onChange callback for input.
 * The text is a different path/property depending on the platform.
 * @param {Object} event
 */
const getTextFromChangeEvent = event => {
  const isWeb = getPlatform() === 'web'
  return isWeb
    ? get(event, 'target.value') // web
    : get(event, 'nativeEvent.text') // native
}

/**
 * Provides text input with autocomplete functionality. As user types, shows a menu of autocomplete options that contain user input as a substring.
 * Parent component must pass the total list of options (in autocompleteValues prop) for this to work.
 * @param {Object} props
 * @param {Function} props.onSelect - (optional) callback of form (text) => {...}, called when user selects a value from the autocomplete menu
 * @param {Function} props.onChange - (optional) callback of form (text) => {...}, called when user types or selects a value. updates character by character
 * @param {String} props.placeholder - (optional) placeholder text filled when no text has been inputted
 * @param {String} props.text - (optional) initial value of the text in the input
 * @param {Object} props.style - (optional) style object for the root view of this component
 * @param {Object} props.inputStyle - (optional) style object for the text input
 * @param {Object} props.menuStyle - (optional) style object for the select menu
 * @param {Object} props.inputRef - (optional) a ref that will be assigned to the TextInput. Use this for obtaining access to TextInput functions like Clear
 * @param {Array} props.values - array of possible strings to use for autocomplete
 * @param {Number} props.menuHeight - (optional) height of menu that shows autocomplete values, before scrolling is necessary
 */
export const Autocomplete = props => {
  const {
    onChange,
    onSelect,
    placeholder = '',
    text = null,
    style = {},
    inputStyle = {},
    menuStyle = {},
    inputRef = null,
    values = [],
    menuHeight = 75,
  } = props


  const [ inputText, updateText ] = useState(text || '')
  const [ 
    autocompleteItems, 
    setSelectedItem 
  ] = useAutocompleteItems(inputText, values)
  // const setSelectedItem = () => {}
  // const [ autocompleteItems ] = useState(values.map(v => ({ text: v, key: v})))

  const onSelectItem = useCallback(({ text = '' }) => {
    updateText(text)
    setSelectedItem(text)
    onSelect?.(text)
  }, [])

  const handleInputChange = useCallback(event => {
    const text = getTextFromChangeEvent(event)
    updateText(text)
    onChange?.(text)
  }, [ onChange, updateText ])

  console.log({ autocompleteItems})

  return (
    <View style={style}>
      <AutocompleteInput
        type={'text'}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputText}
        ref={inputRef}
      />

      { /* nest select in view so that it appears below the input, but still has absolute positioning */ }
      <View>
        <ScrollableSelect
          height={autocompleteItems.length > 0 ? menuHeight : 0}
          style={menuStyle}
          // visible={autocompleteItems.length > 0}
          items={autocompleteItems}
          onSelect={onSelectItem}
          animationDuration={100}
        />
      </View>
    </View>
  )
}

Autocomplete.propTypes = {
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  inputRef: PropTypes.object,
  values: PropTypes.arrayOf(PropTypes.string),
  menuHeight: PropTypes.number,
}
