
import AccessibilityUtil from 'react-native-web/dist/modules/AccessibilityUtil';
import createDOMProps from 'react-native-web/dist/modules/createDOMProps';
import React from 'react';

var createElement = function createElement(component, props) {
  // Use equivalent platform elements where possible.
  var accessibilityComponent;

  if (component && component.constructor === String) {
    accessibilityComponent = AccessibilityUtil.propsToAccessibilityComponent(props);
  }

  var Component = accessibilityComponent || component;
  var domProps = createDOMProps(Component, props);

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  console.log(`---------- create element ----------`)

  return React.createElement.apply(React, [Component, domProps].concat(children));
};

export default createElement;
