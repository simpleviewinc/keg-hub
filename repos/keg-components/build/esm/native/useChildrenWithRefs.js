import React, { useRef, useCallback, useMemo } from 'react';
import { handleRefUpdate } from './handleRefUpdate.js';
import '@keg-hub/jsutils';

var buildPropsForChild = function buildPropsForChild(childRefs, child, index) {
  var key = (child === null || child === void 0 ? void 0 : child.key) || index || child;
  var existingRef = child === null || child === void 0 ? void 0 : child.ref;
  return {
    key: key,
    ref: function ref(childRef) {
      handleRefUpdate(existingRef, childRef);
      childRefs.current[key] = childRef;
    }
  };
};
var useCloneChildCallback = function useCloneChildCallback(childRefs) {
  return useCallback(function (child) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var props = buildPropsForChild(childRefs, child, index);
    return React.isValidElement(child) ? React.cloneElement(child, props) : child;
  }, [childRefs]);
};
var useChildrenWithRefs = function useChildrenWithRefs(children) {
  var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var childRefs = useRef({});
  var cloneChild = useCloneChildCallback(childRefs);
  var updatedChildren = useMemo(function () {
    return enable ? React.Children.count(children) > 1 ? children.map(cloneChild) : cloneChild(children) : children;
  }, [enable, children]);
  return [updatedChildren, childRefs];
};

export { useChildrenWithRefs };
//# sourceMappingURL=useChildrenWithRefs.js.map
