'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var itemHeader = require('./itemHeader.js');
var useClassList = require('./useClassList-89a8dbd4.js');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
require('./view-3fcb25db.js');
require('./view.native-895f9104.js');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./button.js');
require('./touchable.js');
require('./text.js');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getPressHandler.js');
require('./getActiveOpacity.js');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./colors-da502c66.js');
require('./icon-c7ba25ca.js');
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
require('./getPlatform-ec53cd5e.js');
require('./useAccessibilityRole.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className"];
var AppHeader = function AppHeader(props) {
  var className = props.className,
      otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  return React__default['default'].createElement(itemHeader.ItemHeader, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "banner",
    className: useClassList.useClassList('keg-app-header', className),
    appHeader: true
  }, otherProps));
};

exports.AppHeader = AppHeader;
//# sourceMappingURL=appHeader.js.map
