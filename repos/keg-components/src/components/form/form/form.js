import React from 'react'
import { View } from 'KegView'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { useClassList } from '../../../hooks/useClassList'

/**
 * Form
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props - see formPropTypes
 * @property {String} props.type - default ''
 * @property {Object} props.style - custom style
 * @property {Function} props.onSubmit - function when form is submitted
 * @property {Object} props.children
 * @property {Object} ref - reference to native element
 *
 */
export const Form = React.forwardRef((props, ref) => {
  const theme = useTheme()

  const { children, className, elType, style, type, ...elProps } = props

  return (
    <View
      accessibilityRole='form'
      className={useClassList(className, ['keg-form'])}
      {...elProps}
      style={[
        get(theme, 'form.form.default'),
        type && get(theme, `form.form.${type}`),
        style,
      ]}
      ref={ref}
    >
      { children }
    </View>
  )
})

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  onSubmit: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
}
