import PropTypes from 'prop-types'
import { SvgIcon as KegSvgIcon } from './svgIcon.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * SvgIcon
 * @summary SVG component for rendering SVG icons
 *
 * @param {Object} props - see SvgIcon PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const SvgIcon = StyleInjector(KegSvgIcon, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon',
})

SvgIcon.propTypes = {
  ...KegSvgIcon.propTypes,
}
