'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var icon = require('./icon-c7ba25ca.js');
var withTouch = require('./withTouch.js');
require('react');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native-web');
var touchable = require('./touchable.js');
require('./view-3fcb25db.js');
require('./view.native-895f9104.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./useThemePath.js');
require('./useClassList-89a8dbd4.js');

var TouchableIcon = withTouch.withTouch(icon.Icon);
TouchableIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchable.Touchable.propTypes), icon.Icon.propTypes);

exports.TouchableIcon = TouchableIcon;
//# sourceMappingURL=touchableIcon.js.map
