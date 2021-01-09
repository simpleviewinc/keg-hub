'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useClassName = require('./useClassName-6b6da47b.js');

var Switch = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName.useClassName('keg-switch', className, ref);
  return React__default.createElement(reactNative.Switch, _rollupPluginBabelHelpers._extends({}, props, {
    reg: classRef
  }));
});

exports.Switch = Switch;
//# sourceMappingURL=switch-31eb460e.js.map
