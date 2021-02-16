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
)(theme => {
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

  return {
    default: { content, main },
    active: { content, main },
    hover: {
      content,
      main: {
        ...main,
        backgroundColor: palette.gray01,
      },
    },
  }
})

/**
 * Individual item row in ScrollableSelect
 * @param {Object} props.item - object of form { text, key }
 * @param {Function?} props.onSelect - callback called when this item is selected. Will be passed the item.
 */
export const SelectItem = ({ item, onSelect = noOp }) => {
  const handle = useCallback(() => onSelect(item), [ item, onSelect ])
  return <SelectButton
    content={item.text}
    onPress={handle}
  />
}

SelectItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
}
