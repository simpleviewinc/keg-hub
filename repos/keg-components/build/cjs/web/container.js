'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var view = require('./view-3fcb25db.js');
var jsutils = require('@keg-hub/jsutils');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var getPressHandler = require('./getPressHandler.js');
require('@keg-hub/re-theme/colors');
require('./view.native-895f9104.js');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["onPress", "onClick", "children", "flexDir", "size", "style"];
var useHasWidth = function useHasWidth(styles) {
  return React.useMemo(function () {
    return styles.map(function (style) {
      return Boolean(Object.keys(jsutils.pickKeys(style, ['width', 'minWidth', 'maxWidth'])).length);
    }).indexOf(true) !== -1;
  }, styles);
};
var Container = function Container(_ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick,
      children = _ref.children,
      flexDir = _ref.flexDir,
      size = _ref.size,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? jsutils.noPropObj : _ref$style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var containerStyles = jsutils.isArr(style) ? style : [style];
  var hasWidth = useHasWidth(containerStyles);
  var flexStyle = flexDir === 'row' ? {
    flexDirection: flexDir,
    flex: size ? size : hasWidth ? 0 : 1
  } : {};
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({}, props, {
    style: [flexStyle].concat(_rollupPluginBabelHelpers._toConsumableArray(containerStyles))
  }, getPressHandler.getPressHandler(getPlatform.getPlatform(), onClick || onPress)), children);
};

exports.Container = Container;
//# sourceMappingURL=container.js.map
