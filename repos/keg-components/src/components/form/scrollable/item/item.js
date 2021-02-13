import React, { useCallback } from 'react'
import { Button } from 'KegButton'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { noOp } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'

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

export const SelectItem = ({ text = '', onSelect = noOp }) => {
  const handle = useCallback(() => onSelect({ text }), [ text, onSelect ])
  return <SelectButton
    content={text}
    onPress={handle}
  />
}

SelectItem.propTypes = {
  text: PropTypes.string,
  onSelect: PropTypes.func,
}
