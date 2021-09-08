'use strict';

var jsutils = require('@keg-hub/jsutils');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const handleRefUpdate = (ref, update) => {
  return !ref ? update : jsutils.isObj(ref) && 'current' in ref ? ref.current = update : jsutils.checkCall(ref, update);
};

const isValidComponent = Component => React.isValidElement(Component) || jsutils.isFunc(Component);

const renderFromType = (Element, props, Wrapper) => {
  return isValidComponent(Element) ? jsutils.isFunc(Element) ? React__default['default'].createElement(Element, props) : Element : jsutils.isArr(Element) ? Element : Wrapper ? React__default['default'].createElement(Wrapper, props, Element) : Element;
};

const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component) ? React__default['default'].createElement(Component, props) : React__default['default'].createElement(DefComponent, props);
};

exports.handleRefUpdate = handleRefUpdate;
exports.isValidComponent = isValidComponent;
exports.renderCustomOrDefault = renderCustomOrDefault;
exports.renderFromType = renderFromType;
//# sourceMappingURL=renderCustomOrDefault-afda50d9.js.map
