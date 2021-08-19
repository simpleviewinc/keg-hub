'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native-web');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var useScrollIntoView = function useScrollIntoView(ref, shouldScroll) {
  var scrollOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  React.useEffect(function () {
    var _ref$current;
    shouldScroll && ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollIntoView(scrollOptions));
  }, [ref, shouldScroll, scrollOptions]);
  return [ref];
};

var _excluded = ["scrollIntoView", "scrollOptions"];
var withScrollIntoView = function withScrollIntoView(Component) {
  var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var Wrapped = function Wrapped(props) {
    var _props$scrollIntoView = props.scrollIntoView,
        scrollIntoView = _props$scrollIntoView === void 0 ? false : _props$scrollIntoView,
        _props$scrollOptions = props.scrollOptions,
        scrollOptions = _props$scrollOptions === void 0 ? undefined : _props$scrollOptions,
        clientProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
    var options = scrollOptions !== undefined ? scrollOptions : defaultOptions;
    var ref = React.useRef();
    useScrollIntoView(ref, scrollIntoView, options);
    return React__default['default'].createElement(Component, _rollupPluginBabelHelpers._extends({
      ref: ref
    }, clientProps));
  };
  return Wrapped;
};

exports.useScrollIntoView = useScrollIntoView;
exports.withScrollIntoView = withScrollIntoView;
//# sourceMappingURL=withScrollIntoView-0faf5e7e.js.map
