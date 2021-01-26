'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./colors-3022218c.js');
require('./getPlatform-ec53cd5e.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
require('./renderFromType.js');
require('./getPressHandler.js');
require('./ensureClassArray.js');
require('./getActiveOpacity.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-a237c005.js');
require('./view.native-ab314649.js');
require('@keg-hub/re-theme/styleInjector');
require('./view-a5f2a568.js');
require('./useTextAccessibility.js');
require('./kegText.native-b0c7697d.js');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-e909e94a.js');
require('./text.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList = require('./useClassList-9eaefcd6.js');
require('./useThemeTypeAsClass-103ed294.js');
require('./icon-2d468b3c.js');
require('./touchable.js');
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
    className: useClassList.useClassList('keg-app-header', className),
    appHeader: true
  }, otherProps));
};

exports.AppHeader = AppHeader;
//# sourceMappingURL=appHeader.js.map
