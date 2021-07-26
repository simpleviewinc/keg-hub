import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { NavList as KegNavList } from './navList.native'

/**
 * NavList
 * @summary Default NavList component that wraps the React Native NavList. All props are optional
 *
 * @param {Object} props - see NavList PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {String} props.innerClassName - Value to set the innerClassName to (web platform only)
 *
 */
export const NavList = StyleInjector(KegNavList, {
  displayName: 'NavList',
  className: `keg-nav-list`,
})

NavList.propTypes = KegNavList.propTypes
