'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
require('./colors-b60a70f0.js');
require('@keg-hub/re-theme/colors');
require('./buildColorStyles.js');
var platformFlatten = require('./platformFlatten-19172034.js');
require('./buildTheme.js');
var React = require('react');
var React__default = _interopDefault(React);
var getPressHandler = require('./getPressHandler.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-afee43f7.js');
require('./view.native-b2081485.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-bc6e3186.js');

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
  return React__default.createElement(view.View, _rollupPluginBabelHelpers._extends({}, props, {
    style: [flexStyle].concat(_rollupPluginBabelHelpers._toConsumableArray(containerStyles))
  }, getPressHandler.getPressHandler(platformFlatten.getPlatform(), onClick || onPress)), children);
};

exports.Container = Container;
//# sourceMappingURL=container.js.map
