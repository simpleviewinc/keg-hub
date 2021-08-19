'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');

var getOnChangeHandler = function getOnChangeHandler(isWeb, onChange, onValueChange) {
  return _rollupPluginBabelHelpers._defineProperty({}, isWeb ? 'onChange' : 'onValueChange', onChange || onValueChange);
};

exports.getOnChangeHandler = getOnChangeHandler;
//# sourceMappingURL=getOnChangeHandler.js.map
