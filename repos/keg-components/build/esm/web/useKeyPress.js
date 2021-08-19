import { b as _slicedToArray } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { useState, useCallback, useEffect } from 'react';

var manageListeners = function manageListeners(upHandler, downHandler) {
  window.addEventListener('keydown', downHandler);
  window.addEventListener('keyup', upHandler);
  return function () {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('keyup', upHandler);
  };
};
var useKeyPress = function useKeyPress(targetKey) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      keyPressed = _useState2[0],
      setKeyPressed = _useState2[1];
  var downHandler = useCallback(function (evt) {
    return evt.key === targetKey && setKeyPressed(true);
  }, [setKeyPressed, targetKey]);
  var upHandler = useCallback(function (evt) {
    return evt.key === targetKey && setKeyPressed(false);
  }, [setKeyPressed, targetKey]);
  useEffect(function () {
    return manageListeners(upHandler, downHandler);
  }, [downHandler, upHandler]);
  return keyPressed;
};

export { useKeyPress };
//# sourceMappingURL=useKeyPress.js.map
