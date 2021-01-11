import { Touchable as KegTouchable } from './touchable.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * Touchable
 * @summary Touchable component that allows interactions based on touch. All props are optional
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Touchable = StyleInjector(KegTouchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  // Important rules should include the prefixed version
  // Because important rules are checked after going through the prefixer
  // Important rules have `!important` added to them to allow overwriting the style attribute
  important: [ 'transitionDuration', 'WebkitTransitionDuration' ],
})

Touchable.propTypes = KegTouchable.propTypes
