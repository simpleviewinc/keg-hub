'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('./useTextAccessibility.js');
var kegText_native = require('./kegText.native-dfad83ae.js');
require('@keg-hub/re-theme');
var useTextStyles = require('./useTextStyles.js');

var useTextComponent = function useTextComponent(element) {
  return React.useMemo(function () {
    return styleInjector.StyleInjector(kegText_native.KegText(element), {
      displayName: jsutils.capitalize(element),
      className: "keg-".concat(element)
    });
  }, [element]);
};
var KegText = function KegText(element) {
  return React__default.forwardRef(function (props, ref) {
    var textStyles = useTextStyles.useTextStyles(element);
    var Text = useTextComponent(element);
    return React__default.createElement(Text, _rollupPluginBabelHelpers._extends({}, props, {
      style: [textStyles, props.style],
      ref: ref
    }));
  });
};

exports.KegText = KegText;
//# sourceMappingURL=kegText.js.map
