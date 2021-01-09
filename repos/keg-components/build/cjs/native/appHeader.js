'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
require('./renderFromType.js');
require('./getPressHandler.js');
require('./getActiveOpacity.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./view.native-20f555a1.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-3f09043e.js');
require('./text.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./useThemeTypeAsClass.native-90f04031.js');
require('./icon-3cb30f41.js');
require('./touchable.js');
require('./touchable-d386e5c0.js');
require('./button.js');
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
var itemHeader = require('./itemHeader.js');

var AppHeader = function AppHeader(props) {
  var className = props.className,
      otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className"]);
  return React__default.createElement(itemHeader.ItemHeader, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "banner",
    className: useClassList_native.useClassList(),
    appHeader: true
  }, otherProps));
};

exports.AppHeader = AppHeader;
//# sourceMappingURL=appHeader.js.map
