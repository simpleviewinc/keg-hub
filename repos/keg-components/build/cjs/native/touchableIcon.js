'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var icon = require('./icon-b13a8e3e.js');
var withTouch = require('./withTouch.js');
var touchable = require('./touchable-3f00e0ff.js');
require('react');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
require('./view.native-b34604af.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList.native-9e7810c9.js');
require('./touchable.js');
require('@keg-hub/re-theme/styleInjector');

var TouchableIcon = withTouch.withTouch(icon.Icon);
TouchableIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchable.Touchable.propTypes), icon.Icon.propTypes);

exports.TouchableIcon = TouchableIcon;
//# sourceMappingURL=touchableIcon.js.map
