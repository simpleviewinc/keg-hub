'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var getTextFromChangeEvent = function getTextFromChangeEvent(event) {
  return jsutils.get(event, 'nativeEvent.text');
};

exports.getTextFromChangeEvent = getTextFromChangeEvent;
//# sourceMappingURL=getTextFromChangeEvent.js.map
