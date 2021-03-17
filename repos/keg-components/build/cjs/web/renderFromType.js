'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var isValidComponent = require('./isValidComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent.isValidComponent(Element) ? jsutils.isFunc(Element) ? React__default['default'].createElement(Element, props) : Element : jsutils.isArr(Element) ? Element : Wrapper ? React__default['default'].createElement(Wrapper, props, Element) : Element;
};

exports.renderFromType = renderFromType;
//# sourceMappingURL=renderFromType.js.map
