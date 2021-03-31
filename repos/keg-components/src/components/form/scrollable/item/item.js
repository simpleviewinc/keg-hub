import React, { useCallback } from 'react'
import { Button } from 'KegButton'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { noOp } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'

/**
 * A Button styled for the autocomplete
 */
const SelectButton = reStyle(
  Button,
  'styles'
)((theme, props) => {
  const {
    colors: { palette },
  } = theme

  const content = {
    color: palette.black01,
    fontWeight: 'normal',
    alignSelf: 'start',
  }

  const main = {
    borderRadius: 0,
    backgroundColor: palette.white01,
  }

  const highlighted = {
    ...main,
    backgroundColor: palette.gray01
  }

  return {
    default: { 
      content, 
      main: props.highlighted 
        ? highlighted
        : main
    },
    active: { content, main },
    hover: {
      content,
      main: highlighted
    },
  }
})

/**
 * Individual item row in ScrollableSelect
 * @param {Object} props.item - object of form { text, key }
 * @param {Function?} props.onSelect - callback called when this item is selected. Will be passed the item.
 * @param {Object?} props.styles - { main}
 */
export const SelectItem = React.forwardRef((props, ref) => {
  const { 
    item, 
    onSelect = noOp, 
    highlighted = false,
    styles 
  } = props

  const handlePress = useCallback(() => onSelect(item), [ item, onSelect ])

  return <SelectButton
    ref={ref}
    content={item.text}
    onPress={handlePress}
    styles={styles}
    highlighted={highlighted}
  />
})

SelectItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  highlighted: PropTypes.bool,
  styles: PropTypes.object,
}
