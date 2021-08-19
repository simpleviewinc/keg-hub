'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var kegText = require('./kegText.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var useTextStyles = require('./useTextStyles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var useTextComponent = function useTextComponent(element) {
  return React.useMemo(function () {
    return styleInjector.StyleInjector(kegText.KegText(element), {
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
//# sourceMappingURL=kegText-e1842e1b.js.map
