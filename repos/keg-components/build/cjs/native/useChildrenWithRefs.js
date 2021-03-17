'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var handleRefUpdate = require('./handleRefUpdate.js');
require('@keg-hub/jsutils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var buildPropsForChild = function buildPropsForChild(childRefs, child, index) {
  var key = (child === null || child === void 0 ? void 0 : child.key) || index || child;
  var existingRef = child === null || child === void 0 ? void 0 : child.ref;
  return {
    key: key,
    ref: function ref(childRef) {
      handleRefUpdate.handleRefUpdate(existingRef, childRef);
      childRefs.current[key] = childRef;
    }
  };
};
var useCloneChildCallback = function useCloneChildCallback(childRefs) {
  return React.useCallback(function (child) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var props = buildPropsForChild(childRefs, child, index);
    return React__default['default'].isValidElement(child) ? React__default['default'].cloneElement(child, props) : child;
  }, [childRefs]);
};
var useChildrenWithRefs = function useChildrenWithRefs(children) {
  var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var childRefs = React.useRef({});
  var cloneChild = useCloneChildCallback(childRefs);
  var updatedChildren = React.useMemo(function () {
    return enable ? React__default['default'].Children.count(children) > 1 ? children.map(cloneChild) : cloneChild(children) : children;
  }, [enable, children]);
  return [updatedChildren, childRefs];
};

exports.useChildrenWithRefs = useChildrenWithRefs;
//# sourceMappingURL=useChildrenWithRefs.js.map
