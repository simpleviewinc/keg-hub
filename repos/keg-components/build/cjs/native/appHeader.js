'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var itemHeader = require('./itemHeader.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
require('./view.native-5d72f4dd.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./button.js');
require('./touchable-548d2782.js');
require('./touchable.js');
require('@keg-hub/re-theme/styleInjector');
require('./text.js');
require('./kegText-e1842e1b.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getPressHandler.js');
require('./getActiveOpacity.js');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useThemeTypeAsClass.native-90f04031.js');
require('./icon-9317be7c.js');
require('./caption.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
require('./h5.js');
require('./h6.js');
require('./label.js');
require('./p.js');
require('./subtitle.js');
require('./useAccessibilityRole.js');
require('./getPlatform-24228c6c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className"];
var AppHeader = function AppHeader(props) {
  props.className;
      var otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  return React__default['default'].createElement(itemHeader.ItemHeader, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "banner",
    className: useClassList_native.useClassList(),
    appHeader: true
  }, otherProps));
};

exports.AppHeader = AppHeader;
//# sourceMappingURL=appHeader.js.map
