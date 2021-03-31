'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var useScrollIntoView = function useScrollIntoView(ref, shouldScroll) {
  var scrollOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  React.useEffect(function () {
    var _ref$current;
    shouldScroll && ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollIntoView(scrollOptions));
  }, [ref, shouldScroll, scrollOptions]);
  return [ref];
};

exports.useScrollIntoView = useScrollIntoView;
//# sourceMappingURL=useScrollIntoView.js.map
