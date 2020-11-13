'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
require('./colors-b60a70f0.js');
require('@keg-hub/re-theme/colors');
require('./buildColorStyles.js');
require('./platformFlatten-19172034.js');
require('./buildTheme.js');
require('react');
require('./isValidComponent.js');
require('./renderFromType.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-afee43f7.js');
require('./view.native-b2081485.js');
require('@keg-hub/re-theme/styleInjector');
require('./view-bc6e3186.js');
require('@keg-hub/re-theme');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList-2f47489f.js');
var icon = require('./icon-0a118d5f.js');
var touchable = require('./touchable.js');
var withTouch = require('./withTouch.js');

var TouchableIcon = withTouch.withTouch(icon.Icon);
TouchableIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchable.Touchable.propTypes), icon.Icon.propTypes);

exports.TouchableIcon = TouchableIcon;
//# sourceMappingURL=touchableIcon.js.map
