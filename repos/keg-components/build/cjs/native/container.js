'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view_native = require('./view.native-b34604af.js');
var jsutils = require('@keg-hub/jsutils');
var getPressHandler = require('./getPressHandler.js');
var getPlatform = require('./getPlatform-24228c6c.js');
require('@keg-hub/re-theme/colors');
require('react-native');
require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["onPress", "onClick", "children", "flexDir", "size", "style"]);
  var containerStyles = jsutils.isArr(style) ? style : [style];
  var hasWidth = useHasWidth(containerStyles);
  var flexStyle = flexDir === 'row' ? {
    flexDirection: flexDir,
    flex: size ? size : hasWidth ? 0 : 1
  } : {};
  return React__default['default'].createElement(view_native.View, _rollupPluginBabelHelpers._extends({}, props, {
    style: [flexStyle].concat(_rollupPluginBabelHelpers._toConsumableArray(containerStyles))
  }, getPressHandler.getPressHandler(getPlatform.getPlatform(), onClick || onPress)), children);
};

exports.Container = Container;
//# sourceMappingURL=container.js.map
