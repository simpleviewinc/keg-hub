import React from 'react'
import PropTypes from 'prop-types'
import { SelectItem } from '../item/item'
import { SelectView } from './selectView'
import { withScrollIntoView } from 'KegHocs'

/**
 * Wrapper around SelectItem that ensures it stays in the view
 * of the ScrollableSelect list (by automatically scrolling it)
 */
const InViewSelectItem = withScrollIntoView(SelectItem, false)

/**
 * A scrollable menu list of items, with prop-adjustable height and visibility
 * @param {Object} props
 * @param {Array} props.items - array of objects of the form { text, key } - key is optional if each item has unique text
 * @param {Object} props.styles - style object for the view
 * @param {Boolean} props.visible - boolean, indicating the menu is visible or hidden
 * @param {Function} props.onSelect - the callback of form (item) => {...}. Fires when a menu item is selected
 * @param {Number} props.height - the maximum height of the menu before scrolling is required to see remaining items.
 */
export const ScrollableSelect = ({
  items,
  styles,
  visible = true,
  onSelect,
  selectedItem,
  height,
}) => {
  return (
    <SelectView
      style={styles?.main}
      visible={visible}
      height={height ?? 150}
    >
      { items.map(item => {
          const highlighted = selectedItem && (item.key === selectedItem.key)
          return <InViewSelectItem
            key={item.key || item.text}
            item={item}
            onSelect={onSelect}
            highlighted={highlighted}
            scrollIntoView={highlighted}
            style={styles?.content}
          />
       })
      }
    </SelectView>
  )
}

ScrollableSelect.propTypes = {
  styles: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  height: PropTypes.number,
}
