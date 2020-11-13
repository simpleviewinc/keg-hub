'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);

var isValidComponent = function isValidComponent(Component) {
  return React.isValidElement(Component) || jsutils.isFunc(Component);
};

exports.isValidComponent = isValidComponent;
//# sourceMappingURL=isValidComponent.js.map
