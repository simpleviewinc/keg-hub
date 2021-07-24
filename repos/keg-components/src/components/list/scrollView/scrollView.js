import { ScrollView as KegScrollView } from './scrollView.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * ScrollView
 * @summary Default view component that wraps the React Native ScrollView component. All props are optional
 *
 * @param {Object} props - see ScrollView PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {String} props.innerClassName - Value to set the innerClassName to (web platform only)
 *
 */
export const ScrollView = StyleInjector(KegScrollView, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview',
})

ScrollView.propTypes = KegScrollView.propTypes
