'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var kegText_native = require('./kegText.native-1994a0b7.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var useTextStyles = require('./useTextStyles.js');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('react-native');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var useTextComponent = function useTextComponent(element) {
  return React.useMemo(function () {
    return styleInjector.StyleInjector(kegText_native.KegText(element), {
      displayName: jsutils.capitalize(element),
      className: "keg-".concat(element)
    });
  }, [element]);
};
var KegText = function KegText(element) {
  return React__default['default'].forwardRef(function (props, ref) {
    var textStyles = useTextStyles.useTextStyles(element);
    var Text = useTextComponent(element);
    return React__default['default'].createElement(Text, _rollupPluginBabelHelpers._extends({}, props, {
      style: [textStyles, props.style],
      ref: ref
    }));
  });
};

exports.KegText = KegText;
//# sourceMappingURL=kegText.js.map
