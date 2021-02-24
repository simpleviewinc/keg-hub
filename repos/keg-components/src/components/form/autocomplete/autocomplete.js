import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { noOpObj, noPropArr } from '@keg-hub/jsutils'
import { getTextFromChangeEvent } from 'KegUtils'
import { useAutocompleteItems, useAutocompleteKeyChange } from 'KegHooks'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { ScrollableSelect } from '../scrollable/select/scrollableSelect'
import { Input } from 'KegInput'
import { View } from 'KegView'

/**
 * An absolutely-positioned scrollabale select
 */
const FloatingScrollableSelect = reStyle(
  ScrollableSelect,
  'styles'
)(() => ({
  main: { position: 'absolute', zIndex: 9999 },
}))

/**
 * Provides text input with autocomplete functionality. As user types, shows a menu of autocomplete options that contain user input as a substring.
 * Parent component must pass the total list of options (in autocompleteValues prop) for this to work.
 * @param {Object} props
 * @param {Array<string> | Array<Object>} props.values - array of possible items to use for autocomplete.
 *  - If it is Array<string>, any duplicates will be ignored.
 *  - If it is Array<object>, each object should be of form { text: string, key: string? },
 *    where key is an optional unique id that can distinguish duplicates
 * @param {Function?} props.onSelect - (optional) callback of form (text) => {...}, called when user selects a value from the autocomplete menu
 * @param {Function?} props.onChange - (optional) callback of form (text) => {...}, called when user types or selects a value. updates character by character
 * @param {String?} props.placeholder - (optional) placeholder text filled when no text has been inputted
 * @param {String?} props.text - (optional) initial value of the text in the input
 * @param {Object?} props.styles - (optional) style object for the root view of this component
 * @param {Object?} props.inputRef - (optional) a ref that will be assigned to the TextInput. Use this for obtaining access to TextInput methods like .clear()
 * @param {Number?} props.menuHeight - (optional) height of menu that shows autocomplete values
 * @param {*?} props.* - remaining props are passed straight through to the Input component
 */
export const Autocomplete = props => {
  const {
    onChange,
    onSelect,
    placeholder = '',
    text = null,
    styles = noOpObj,
    inputRef = null,
    values = noPropArr,
    menuHeight,
    ...inputProps
  } = props

  const [ inputText, updateText ] = useState(text || '')
  const [
    autocompleteItems,
    setSelectedItem,
    selectedItem,
  ] = useAutocompleteItems(inputText, values)

  const onSelectItem = useCallback(
    item => {
      updateText(item?.text)
      setSelectedItem(item)
      item && onSelect?.(item)
    },
    [ setSelectedItem, updateText ]
  )

  // TODO: we need to do one more thing when the key is pressed:
  // need to unfocus the input? OR something. It seemse like the TextInput is capturing
  // all the key presses
  useAutocompleteKeyChange(
    autocompleteItems,
    selectedItem?.index,
    setSelectedItem
  )

  const handleInputChange = useCallback(
    event => {
      const text = getTextFromChangeEvent(event)
      updateText(text)
      onChange?.(text)
    },
    [ onChange, updateText ]
  )

  // on enter, select the top element
  const onEnterPress = useCallback(
    () => onSelectItem(autocompleteItems[selectedItem.index]),
    [ autocompleteItems, onSelectItem ]
  )

  return (
    <View style={styles?.main}>
      <Input
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputText}
        ref={inputRef}
        style={styles?.content?.input}
        onSubmitEditing={onEnterPress}
        useTouch={false}
        {...inputProps}
      />

      { /* nest select in view so that it appears below the input and still absolute-positioned */ }
      <View>
        <FloatingScrollableSelect
          height={menuHeight}
          styles={styles?.content?.menu}
          visible={autocompleteItems.length > 0}
          items={autocompleteItems}
          onSelect={onSelectItem}
          animationDuration={100}
        />
      </View>
    </View>
  )
}

Autocomplete.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        key: PropTypes.string,
      }),
    ])
  ),
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  styles: PropTypes.object,
  inputRef: PropTypes.object,
  menuHeight: PropTypes.number,
}
