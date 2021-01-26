'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
var reactNative = require('react-native');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var useScrollClassName = require('./useScrollClassName-8290cc87.js');

var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName.useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(reactNative.ScrollView, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }));
});

var ScrollView$1 = styleInjector.StyleInjector(ScrollView, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview'
});
ScrollView$1.propTypes = ScrollView.propTypes;

exports.ScrollView = ScrollView$1;
//# sourceMappingURL=scrollView.js.map
