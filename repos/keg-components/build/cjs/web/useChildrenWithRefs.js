'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var handleRefUpdate = require('./handleRefUpdate.js');

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
    return React__default.isValidElement(child) ? React__default.cloneElement(child, props) : child;
  }, [childRefs]);
};
var useChildrenWithRefs = function useChildrenWithRefs(children) {
  var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var childRefs = React.useRef({});
  var cloneChild = useCloneChildCallback(childRefs);
  var updatedChildren = React.useMemo(function () {
    return enable ? React__default.Children.count(children) > 1 ? children.map(cloneChild) : cloneChild(children) : children;
  }, [enable, children]);
  return [updatedChildren, childRefs];
};

exports.useChildrenWithRefs = useChildrenWithRefs;
//# sourceMappingURL=useChildrenWithRefs.js.map
