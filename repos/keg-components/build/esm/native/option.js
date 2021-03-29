import React from 'react';
import { isStr, isNum } from '@keg-hub/jsutils';
import { Picker } from 'react-native';

var SelectOption = Picker.Item;
var useable = function useable(item) {
  return (isStr(item) || isNum(item)) && item;
};
var getVal = function getVal(value, text, children, label) {
  return useable(value) || useable(text) || useable(children) || useable(label);
};
var Option = function Option(props) {
  var label = props.label,
      children = props.children,
      text = props.text,
      value = props.value;
  return React.createElement(SelectOption, {
    label: getVal(label, value, text),
    value: getVal(value, text, children, label)
  });
};

export { Option };
//# sourceMappingURL=option.js.map
