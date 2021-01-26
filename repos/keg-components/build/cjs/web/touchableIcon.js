'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('react');
require('./isValidComponent.js');
require('./renderFromType.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-a237c005.js');
require('./view.native-ab314649.js');
require('@keg-hub/re-theme/styleInjector');
require('./view-a5f2a568.js');
require('@keg-hub/re-theme');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList-9eaefcd6.js');
var icon = require('./icon-2d468b3c.js');
var touchable = require('./touchable.js');
var withTouch = require('./withTouch.js');

var TouchableIcon = withTouch.withTouch(icon.Icon);
TouchableIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchable.Touchable.propTypes), icon.Icon.propTypes);

exports.TouchableIcon = TouchableIcon;
//# sourceMappingURL=touchableIcon.js.map
