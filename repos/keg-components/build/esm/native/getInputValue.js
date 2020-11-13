import { isFunc, isArr, get } from '@keg-hub/jsutils';

var getInputValueKey = function getInputValueKey(isWeb, onChange, onValueChange, readOnly) {
  return !isWeb ? 'selectedValue' : isFunc(onChange) || isFunc(onValueChange) || readOnly ? 'value' : 'defaultValue';
};
var getValueFromChildren = function getValueFromChildren(value, children) {
  return value ? value : children ? isArr(children) ? get(children, ['0', 'props', 'children']) : get(children, ['props', 'children']) : '';
};

export { getInputValueKey, getValueFromChildren };
//# sourceMappingURL=getInputValue.js.map
