import React from 'react'
import PropTypes from 'prop-types'
import { SelectItem } from '../item/item'
import { SelectView } from './selectView'
import { noOpObj } from '@keg-hub/jsutils'

/**
 * A scrollable menu list of items.
 * @param {Object} props
 * @param {Array} props.items - array of objects of the form { text, key } - key is optional if each item has unique text
 * @param {Object} props.style - style object for the view
 * @param {Boolean} props.visible - boolean, indicating the menu is visible or hidden
 * @param {Object} props.theme - theme object
 * @param {Function} props.onSelect - the callback of form (item) => {...}. Fires when a menu item is selected
 * @param {Number} props.height - the maximum height of the menu before scrolling is required to see remaining items.
 */
export const ScrollableSelect = ({
  items,
  style = noOpObj,
  visible = true,
  onSelect,
  height = 150,
}) => {
  return (
    <SelectView
      style={style}
      visible={visible}
      height={height}
    >
      { items.map(({ text, key }) => (
        <SelectItem
          key={key || text}
          text={text}
          onSelect={onSelect}
        />
      )) }
    </SelectView>
  )
}

ScrollableSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool,
  theme: PropTypes.object,
  onSelect: PropTypes.func,
  height: PropTypes.number,
}
