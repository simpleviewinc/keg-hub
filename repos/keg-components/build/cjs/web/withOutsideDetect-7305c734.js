'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var eventIsOutside = function eventIsOutside(evt, ref) {
  return (ref === null || ref === void 0 ? void 0 : ref.current) && !ref.current.contains(evt.target);
};
var useOutsideDetect = function useOutsideDetect(ref, onOutsideClick) {
  React.useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      return eventIsOutside(event, ref) && (onOutsideClick === null || onOutsideClick === void 0 ? void 0 : onOutsideClick(event));
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

var withOutsideDetect = function withOutsideDetect(Component) {
  var wrapped = React__default['default'].forwardRef(function (props, ref) {
    var onOutsideClick = props.onOutsideClick,
        clientProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["onOutsideClick"]);
    var fallbackRef = React__default['default'].useRef();
    var detectRef = ref || fallbackRef;
    useOutsideDetect(detectRef, onOutsideClick);
    return React__default['default'].createElement(Component, _rollupPluginBabelHelpers._extends({}, clientProps, {
      ref: detectRef
    }));
  });
  wrapped.displayName = Component.displayName || Component.name || 'Component';
  return wrapped;
};

exports.useOutsideDetect = useOutsideDetect;
exports.withOutsideDetect = withOutsideDetect;
//# sourceMappingURL=withOutsideDetect-7305c734.js.map
