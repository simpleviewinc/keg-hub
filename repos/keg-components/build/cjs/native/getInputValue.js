'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var getInputValueKey = function getInputValueKey(isWeb, onChange, onValueChange, readOnly) {
  return !isWeb ? 'selectedValue' : jsutils.isFunc(onChange) || jsutils.isFunc(onValueChange) || readOnly ? 'value' : 'defaultValue';
};
var getValueFromChildren = function getValueFromChildren(value, children) {
  return value ? value : children ? jsutils.isArr(children) ? jsutils.get(children, ['0', 'props', 'children']) : jsutils.get(children, ['props', 'children']) : '';
};

exports.getInputValueKey = getInputValueKey;
exports.getValueFromChildren = getValueFromChildren;
//# sourceMappingURL=getInputValue.js.map
