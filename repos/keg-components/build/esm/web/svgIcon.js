import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import PropTypes from 'prop-types';
import { S as SvgIcon$1 } from './svgIcon.native-9be49668.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import 'react';
import 'react-native-svg';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';

var SvgIcon = StyleInjector(SvgIcon$1, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon'
});
SvgIcon.propTypes = _objectSpread2(_objectSpread2({}, SvgIcon$1.propTypes), {}, {
  className: PropTypes.string
});

export { SvgIcon };
//# sourceMappingURL=svgIcon.js.map
