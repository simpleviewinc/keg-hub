'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var getScrollValues = require('./getScrollValues-f3b1bfa7.js');

var useScroll = function useScroll() {
  var onScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOp;
  var onScrollEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOp;
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var _useState = React.useState({
    scrollX: 0,
    scrollY: 0
  }),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      scroll = _useState2[0],
      setScroll = _useState2[1];
  var timeoutRef = React.useRef(null);
  var eventHandler = React.useCallback(jsutils.throttle(function (event) {
    var isEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var scrollUpdate = getScrollValues.getScrollValues();
    isEnd ? onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd(event, scrollUpdate) : onScroll === null || onScroll === void 0 ? void 0 : onScroll(event, scrollUpdate);
    setScroll(scrollUpdate);
  }, amount), [amount, onScroll, onScrollEnd, setScroll]);
  var handlerTimeout = React.useCallback(function (event) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      eventHandler(event, true);
    }, 3 * amount);
    eventHandler(event);
  }, [amount, timeoutRef && timeoutRef.current, eventHandler]);
  React.useLayoutEffect(function () {
    window.addEventListener('scroll', handlerTimeout);
    return function () {
      return window.removeEventListener('scroll', handlerTimeout);
    };
  }, [handlerTimeout]);
  return scroll;
};

exports.useScroll = useScroll;
//# sourceMappingURL=useScroll.js.map
