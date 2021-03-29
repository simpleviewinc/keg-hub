'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var jsutils = require('@keg-hub/jsutils');

var isValidComponent = function isValidComponent(Component) {
  return React.isValidElement(Component) || jsutils.isFunc(Component);
};

exports.isValidComponent = isValidComponent;
//# sourceMappingURL=isValidComponent.js.map
