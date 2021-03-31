import React from 'react'
import PropTypes from 'prop-types'
import { useStyle } from '@keg-hub/re-theme'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { useAccessibilityRole } from 'KegHooks'

export const Divider = React.forwardRef(
  ({ className, style, ...props }, ref) => {
    const dividerStyle = useStyle('divider')
    const accessibilityRoleObj = useAccessibilityRole('separator')

    return (
      <View
        ref={ref}
        className={useClassList('keg-divider', className)}
        {...props}
        style={[ dividerStyle, style ]}
        {...accessibilityRoleObj}
      />
    )
  }
)

Divider.propTypes = {
  styles: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
}
