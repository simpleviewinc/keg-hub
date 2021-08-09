import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { NavList as KegNavList } from './navList.native'

/**
 * NavList
 * @summary Default NavList component that wraps the React Native NavList. All props are optional
 * @param {Object} props - see navList.native PropTypes
 *
 */
export const NavList = StyleInjector(KegNavList, {
  displayName: 'NavList',
  className: `keg-nav-list`,
})

NavList.propTypes = KegNavList.propTypes
