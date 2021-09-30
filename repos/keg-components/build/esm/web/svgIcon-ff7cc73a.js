import { d as _objectWithoutProperties, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { S as SvgIcon$1, N as NativeSvg } from './svgIcon.native-19802c84.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';

var KegSvgIcon = SvgIcon$1,
    svgElements = _objectWithoutProperties(NativeSvg, ["SvgIcon"]);
var SvgIcon = StyleInjector(KegSvgIcon, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon'
});
Object.assign(SvgIcon, svgElements);
SvgIcon.propTypes = _objectSpread2({}, KegSvgIcon.propTypes);

export { SvgIcon as S };
//# sourceMappingURL=svgIcon-ff7cc73a.js.map
