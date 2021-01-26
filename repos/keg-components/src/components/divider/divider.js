import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'

export const Divider = React.forwardRef(
  ({ className, style, ...props }, ref) => {
    const theme = useTheme()

    return (
      <View
        ref={ref}
        accessibilityRole='separator'
        className={useClassList('keg-divider', className)}
        {...props}
        style={[ get(theme, ['divider']), style ]}
      />
    )
  }
)

Divider.propTypes = {
  styles: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
}
