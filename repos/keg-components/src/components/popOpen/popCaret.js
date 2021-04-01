import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { PopCaret as PCaret } from './popReStyle'

/**
 * Builds a styles object based on caret width and border radius
 * @param {number} caretWidth - width of the carets side
 * @param {number} bRad - Border-radius of the carets
 * 
 * @returns {Object} - Contains properties defining the styles of the caret
 */
const useCaretStyles = (caretWidth, bRad) => useMemo({
  align: {
    center: { alignSelf: 'center' },
    right: { alignSelf: 'flex-end' },
  },
  position: {
    top: {
      marginTop: (caretWidth / 2 + bRad / 2) * -1,
      marginBottom: caretWidth / 2 + bRad / 2,
    },
    bottom: {
      marginBottom: (caretWidth / 2 + bRad / 2) * -1,
      marginTop: caretWidth / 2 + bRad / 2,
    },
    left: {
      marginLeft: (caretWidth / 2 + bRad / 2) * -1,
      marginRight: caretWidth / 2 + bRad / 2,
    },
    right: {
      marginRight: (caretWidth / 2 + bRad / 2) * -1,
      marginLeft: caretWidth / 2 + bRad / 2,
    }
  }
}, [caretWidth, bRad])


/**
 * PopCaret component - arrow type pointer displayed on an edge of the PopOver component
 */
export const PopCaret = props => {

  const caretStyles = useCaretStyles(
    props.styles?.caret?.width || 10,
    props.styles?.caret?.borderRadius || 2,
  )

  return (
    <PCaret
      {...props}
      caretStyles={caretStyles}
    />
  ) 
}

PopCaret.propTypes = {
  backgroundColor: PropTypes.string,
  align: PropTypes.string, // 'left' | 'center' | 'right'
  position: PropTypes.string,
  style: PropTypes.object,
}