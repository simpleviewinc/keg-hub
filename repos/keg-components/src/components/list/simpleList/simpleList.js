import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { SimpleList as KegSimpleList } from './simpleList.native'

/**
 * SimpleList
 * @summary Default SimpleList component that wraps the React Native SimpleList. All props are optional
 *
 * @param {Object} props - see SimpleList PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {String} props.innerClassName - Value to set the innerClassName to (web platform only)
 *
 */
export const SimpleList = StyleInjector(KegSimpleList, {
  displayName: 'SimpleList',
  className: `keg-simple-list`,
})

SimpleList.propTypes = KegSimpleList.propTypes
