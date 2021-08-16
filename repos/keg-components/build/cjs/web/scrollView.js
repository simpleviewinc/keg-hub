'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var useScrollClassName = require('./useScrollClassName-5d361028.js');
var reactNativeWeb = require('react-native-web');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/jsutils');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "innerClassName"];
var ScrollView$1 = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useScrollClassName.useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React__default['default'].createElement(reactNativeWeb.ScrollView, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }));
});

var ScrollView = styleInjector.StyleInjector(ScrollView$1, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview'
});
ScrollView.propTypes = ScrollView$1.propTypes;

exports.ScrollView = ScrollView;
//# sourceMappingURL=scrollView.js.map
