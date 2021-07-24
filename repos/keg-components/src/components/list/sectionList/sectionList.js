import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { SectionList as KegSectionList } from './sectionList.native'

/**
 * SectionList
 * @summary Default SectionList component that wraps the React Native SectionList. All props are optional
 *
 * @param {Object} props - see SectionList PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {String} props.innerClassName - Value to set the innerClassName to (web platform only)
 *
 */
export const SectionList = StyleInjector(KegSectionList, {
  displayName: 'SectionList',
  className: `keg-sectionlist`,
})

SectionList.propTypes = KegSectionList.propTypes
