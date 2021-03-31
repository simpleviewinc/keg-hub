'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var useOutsideDetect = function useOutsideDetect() {
  jsutils.logData('useOutsideDetect is not implemented on native platforms yet', 'warn');
};

var withOutsideDetect = function withOutsideDetect(Component) {
  var wrapped = React__default['default'].forwardRef(function (props, ref) {
    props.onOutsideClick;
        var clientProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["onOutsideClick"]);
    var fallbackRef = React__default['default'].useRef();
    var detectRef = ref || fallbackRef;
    useOutsideDetect();
    return React__default['default'].createElement(Component, _rollupPluginBabelHelpers._extends({}, clientProps, {
      ref: detectRef
    }));
  });
  wrapped.displayName = Component.displayName || Component.name || 'Component';
  return wrapped;
};

exports.useOutsideDetect = useOutsideDetect;
exports.withOutsideDetect = withOutsideDetect;
//# sourceMappingURL=withOutsideDetect-58a390ac.js.map
