import { ScrollView as KegScrollView } from './scrollView.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * View
 * @summary Default view component that wraps the React Native View component. All props are optional
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const ScrollView = StyleInjector(
  KegScrollView,
  { displayName: 'Scroll-View', className: 'keg-scroll-view' }
)

ScrollView.propTypes = KegScrollView.propTypes
