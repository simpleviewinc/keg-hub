'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('react');
require('./isValidComponent.js');
require('./renderFromType.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./view.native-20f555a1.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList.native-9e7810c9.js');
var icon = require('./icon-3cb30f41.js');
require('./touchable.js');
var touchable$1 = require('./touchable-d386e5c0.js');
var withTouch = require('./withTouch.js');

var TouchableIcon = withTouch.withTouch(icon.Icon);
TouchableIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchable$1.Touchable.propTypes), icon.Icon.propTypes);

exports.TouchableIcon = TouchableIcon;
//# sourceMappingURL=touchableIcon.js.map
