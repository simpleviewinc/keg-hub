import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { SectionList as KegSectionList } from './sectionList.native'

/**
 * SectionList
 * @summary Default SectionList component that wraps the React Native SectionList. All props are optional
 *
 * @param {Object} props - see sectionList.native PropTypes
 *
 */
export const SectionList = StyleInjector(KegSectionList, {
  displayName: 'SectionList',
  className: `keg-section-list`,
})

SectionList.propTypes = KegSectionList.propTypes
