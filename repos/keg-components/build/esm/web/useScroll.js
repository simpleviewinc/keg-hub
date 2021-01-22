import { b as _slicedToArray } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { throttle, noOp } from '@keg-hub/jsutils';
import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { g as getScrollValues } from './getScrollValues-1e13266a.js';

var useScroll = function useScroll() {
  var onScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noOp;
  var onScrollEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noOp;
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var _useState = useState({
    scrollX: 0,
    scrollY: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      scroll = _useState2[0],
      setScroll = _useState2[1];
  var timeoutRef = useRef(null);
  var eventHandler = useCallback(throttle(function (event) {
    var isEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var scrollUpdate = getScrollValues();
    isEnd ? onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd(event, scrollUpdate) : onScroll === null || onScroll === void 0 ? void 0 : onScroll(event, scrollUpdate);
    setScroll(scrollUpdate);
  }, amount), [amount, onScroll, onScrollEnd, setScroll]);
  var handlerTimeout = useCallback(function (event) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      eventHandler(event, true);
    }, 3 * amount);
    eventHandler(event);
  }, [amount, timeoutRef && timeoutRef.current, eventHandler]);
  useLayoutEffect(function () {
    window.addEventListener('scroll', handlerTimeout);
    return function () {
      return window.removeEventListener('scroll', handlerTimeout);
    };
  }, [handlerTimeout]);
  return scroll;
};

export { useScroll };
//# sourceMappingURL=useScroll.js.map
