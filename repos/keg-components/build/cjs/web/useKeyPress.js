'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');

var manageListeners = function manageListeners(upHandler, downHandler) {
  window.addEventListener('keydown', downHandler);
  window.addEventListener('keyup', upHandler);
  return function () {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('keyup', upHandler);
  };
};
var useKeyPress = function useKeyPress(targetKey) {
  var _useState = React.useState(false),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      keyPressed = _useState2[0],
      setKeyPressed = _useState2[1];
  var downHandler = React.useCallback(function (evt) {
    return evt.key === targetKey && setKeyPressed(true);
  }, [setKeyPressed, targetKey]);
  var upHandler = React.useCallback(function (evt) {
    return evt.key === targetKey && setKeyPressed(false);
  }, [setKeyPressed, targetKey]);
  React.useEffect(function () {
    return manageListeners(upHandler, downHandler);
  }, [downHandler, upHandler]);
  return keyPressed;
};

exports.useKeyPress = useKeyPress;
//# sourceMappingURL=useKeyPress.js.map
