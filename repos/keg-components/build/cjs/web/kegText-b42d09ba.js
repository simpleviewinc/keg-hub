'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var kegText_native = require('./kegText.native-dfad83ae.js');
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
//# sourceMappingURL=kegText-b42d09ba.js.map
