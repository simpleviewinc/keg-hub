import { useCallback, useRef } from 'react';
import { isFunc, eitherArr } from '@keg-hub/jsutils';
import { handleRefUpdate } from './handleRefUpdate.js';
import { updateClassNames } from './updateClassNames.js';

var useScrollClassName = function useScrollClassName(defClass, className, innerClassName, ref) {
  className = eitherArr(className, [className]);
  var classRef = useRef(className);
  return useCallback(function (nativeObject) {
    var scrollResponder = nativeObject && isFunc(nativeObject.getScrollResponder) ? nativeObject.getScrollResponder() : nativeObject;
    if (scrollResponder) {
      isFunc(scrollResponder.getScrollableNode) && updateClassNames(scrollResponder.getScrollableNode(), classRef, defClass, className);
      isFunc(scrollResponder.getInnerViewNode) && updateClassNames(scrollResponder.getInnerViewNode(), classRef, "".concat(defClass, "-container"), innerClassName);
    }
    handleRefUpdate(ref, nativeObject);
  }, [defClass, className.join(' '), ref]);
};

export { useScrollClassName as u };
//# sourceMappingURL=useScrollClassName-31386e17.js.map
