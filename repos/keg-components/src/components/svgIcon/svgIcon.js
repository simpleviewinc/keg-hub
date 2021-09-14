// import { SvgIcon as KegSvgIcon } from './svgIcon.native'
import * as NativeSvg from './svgIcon.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

const { SvgIcon: KegSvgIcon, ...svgElements } = NativeSvg

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

// add all the react-native-svg exports, like Circle, so that clients
// can use them as children (e.g. SvgIcon.Circle)
Object.assign(SvgIcon, svgElements)

SvgIcon.propTypes = {
  ...KegSvgIcon.propTypes,
}
