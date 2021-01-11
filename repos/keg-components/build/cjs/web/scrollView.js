'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var ensureClassArray = require('./ensureClassArray.js');
var handleRefUpdate = require('./handleRefUpdate.js');
var updateClassNames = require('./updateClassNames.js');
var reactNative = require('react-native');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var useScrollClassNames = function useScrollClassNames(defClass, className, innerClassName, ref) {
  className = ensureClassArray.ensureClassArray(className);
  var classRef = React.useRef(className);
  return React.useCallback(function (scrollResponder) {
    if ( scrollResponder) {
      updateClassNames.updateClassNames(scrollResponder.getScrollableNode(), classRef, defClass, className);
      updateClassNames.updateClassNames(scrollResponder.getInnerViewNode(), classRef, "".concat(defClass, "-container"), innerClassName);
    }
    handleRefUpdate.handleRefUpdate(ref, scrollResponder);
  }, [defClass, className.join(' '), ref]);
};
var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassNames('keg-scrollview', className, innerClassName, ref);
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
