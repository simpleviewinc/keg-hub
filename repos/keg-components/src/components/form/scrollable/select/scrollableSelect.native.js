import React from 'react'
import { Animated, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { useFromToAnimation } from 'KegHooks'
import { useTheme } from 're-theme'
import { SelectItem } from '../item/item'

/**
 * A scrollable menu list of items.
 * @param {Object} props
 * @param {Array} props.items - array of objects of the form { text, key } - key is optional if each item has unique text
 * @param {Object} props.style - style object for the view
 * @param {Boolean} props.visible - boolean, indicating the menu is visible or hidden
 * @param {Object} props.theme - theme object
 * @param {Function} props.onSelect - the callback of form (item) => {...}. Fires when a menu item is selected
 * @param {Number} props.height - the maximum height of the menu before scrolling is required to see remaining items.
 * @param {Number} props.animationDuration - the duration (in milliseconds) of the menu's open/close animation. Defaults to 200ms
 */
export const ScrollableSelect = ({
  items,
  style = {},
  visible = true,
  onSelect = () => {},
  height = 150,
  animationDuration = 200,
}) => {
  const theme = useTheme()

  // initial menu height *before* animation
  const current = visible ? 0 : height

  const [animatedHeight] = useFromToAnimation({
    current,
    from: 0,
    to: height,
    duration: animationDuration,
  })

  return (
    <Animated.View
      style={theme.join(theme.form.autocomplete.menu, style, {
        height: animatedHeight,
      })}
    >
      <FlatList
        data={items}
        keyExtractor={item => item.key || item.text}
        renderItem={({ item }) => (
          <SelectItem
            theme={theme}
            text={item.text}
            onSelect={() => onSelect(item)}
          />
        )}
      />
    </Animated.View>
  )
}

ScrollableSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool,
  theme: PropTypes.object,
  onSelect: PropTypes.func,
  height: PropTypes.number,
  animationDuration: PropTypes.number,
}
