import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import PropTypes from 'prop-types'

const buildStyles = (theme, type, elType) => {
  const form = theme.get('form.form.default', type && `form.form.${type}`)

  return { form }
}

export const FormWrapper = React.forwardRef((props, ref) => {
  const theme = useTheme()

  const { children, Element, elType, isWeb, style, type, ...elProps } = props

  const builtStyles = buildStyles(theme, type, elType)

  return (
    <Element
      elProps={elProps}
      ref={ref}
      style={theme.join(builtStyles.form, style)}
      children={children}
    />
  )
})

FormWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
}
