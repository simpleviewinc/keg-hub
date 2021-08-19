'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getPlatform = require('./getPlatform-ec53cd5e.js');
var jsutils = require('@keg-hub/jsutils');

var getTextFromChangeEvent = function getTextFromChangeEvent(event) {
  var isWeb = getPlatform.getPlatform() === 'web';
  return isWeb ? jsutils.get(event, 'target.value')
  : jsutils.get(event, 'nativeEvent.text');
};

exports.getTextFromChangeEvent = getTextFromChangeEvent;
//# sourceMappingURL=getTextFromChangeEvent.js.map
