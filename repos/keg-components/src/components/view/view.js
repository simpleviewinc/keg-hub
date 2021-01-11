import { View as KegView } from './view.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * View
 * @summary Default view component that wraps the React Native View component. All props are optional
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const View = StyleInjector(KegView, {
  displayName: 'View',
  className: 'keg-view',
})

View.propTypes = KegView.propTypes
