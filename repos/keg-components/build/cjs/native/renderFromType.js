'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var isValidComponent = require('./isValidComponent.js');

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent.isValidComponent(Element) ? jsutils.isFunc(Element) ? React__default.createElement(Element, props) : Element : jsutils.isArr(Element) ? Element : Wrapper ? React__default.createElement(Wrapper, props, Element) : Element;
};

exports.renderFromType = renderFromType;
//# sourceMappingURL=renderFromType.js.map
