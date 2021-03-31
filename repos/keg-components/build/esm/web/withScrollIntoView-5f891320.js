import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useEffect, useRef } from 'react';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import 'react-native';

var useScrollIntoView = function useScrollIntoView(ref, shouldScroll) {
  var scrollOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  useEffect(function () {
    var _ref$current;
    shouldScroll && ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollIntoView(scrollOptions));
  }, [ref, shouldScroll, scrollOptions]);
  return [ref];
};

var withScrollIntoView = function withScrollIntoView(Component) {
  var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var Wrapped = function Wrapped(props) {
    var _props$scrollIntoView = props.scrollIntoView,
        scrollIntoView = _props$scrollIntoView === void 0 ? false : _props$scrollIntoView,
        _props$scrollOptions = props.scrollOptions,
        scrollOptions = _props$scrollOptions === void 0 ? undefined : _props$scrollOptions,
        clientProps = _objectWithoutProperties(props, ["scrollIntoView", "scrollOptions"]);
    var options = scrollOptions !== undefined ? scrollOptions : defaultOptions;
    var ref = useRef();
    useScrollIntoView(ref, scrollIntoView, options);
    return React.createElement(Component, _extends({
      ref: ref
    }, clientProps));
  };
  return Wrapped;
};

export { useScrollIntoView as u, withScrollIntoView as w };
//# sourceMappingURL=withScrollIntoView-5f891320.js.map
