import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { mod } from '@keg-hub/jsutils'
import { Input } from 'KegInput'

/**
 * Key Press Handler for AutocompleteInput. Updates the
 * highlighted item in the menu when the user
 * presses the up or down arrow on the keyboard.
 * @param {number?} currentIndex - currently selected index in items
 * @param {Function} setSelectedItem - function to highlight an item
 * @param {Array<Object>} items - currently visible items in list
 */
const useKeyPressHandler = (currentIndex, setSelectedItem, items) =>{
  const up = 'ArrowUp'
  const down = 'ArrowDown'
  return useCallback(
    ({ key }) => {
      if (key !== up && key !== down) return

      const delta = (key === down) ? 1 : -1
      const nextIndex = mod((currentIndex + delta) || 0, items.length)

      items[nextIndex] && 
        setSelectedItem(items[nextIndex])
    },
    [ currentIndex, setSelectedItem, items, ] 
  )
} 

/**
 * 
 * @param {Object} props
 * @param {number} props.highlightedIndex - index of currently highlighted item
 * @param {Function} props.highlightItem - highlights the item object passed to it
 * @param {Function} props.selectItem - selects the item, filling the input text
 * @param {Array<Object>} props.items - the possible autocomplete items
 * @param {...*} props.* - remaining props are passed to <Input />
 */
export const AutocompleteInput = ({ highlightedIndex, highlightItem, selectItem, items, ...props }) => {
  // on key press, highlight the element depending on arrow-up or arrow-down
  const onKeyPress = useKeyPressHandler(
    highlightedIndex, 
    highlightItem, 
    items,
  )

  // on key press, select the highlighted item
  const onEnterPress = useCallback(
    () => selectItem?.(items[highlightedIndex]),
    [ items, selectItem ]
  )

  return <Input
    onKeyPress={onKeyPress}
    onSubmitEditing={onEnterPress}
    useTouch={false}
    {...props}    
  />
}

AutocompleteInput.propTypes = {
  ...Input.propTypes,
  highlightedIndex: PropTypes.number,
  highlightItem: PropTypes.func,
  selectItem: PropTypes.func,
  items: PropTypes.array,
}