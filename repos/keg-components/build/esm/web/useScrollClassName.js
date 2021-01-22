import './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { eitherArr, isFunc } from '@keg-hub/jsutils';
import { useRef, useCallback } from 'react';
import './ensureClassArray.js';
import { handleRefUpdate } from './handleRefUpdate.js';
import { updateClassNames } from './updateClassNames.js';

var useScrollClassName = function useScrollClassName(defClass, className, innerClassName, ref) {
  className = eitherArr(className, [className]);
  var classRef = useRef(className);
  return useCallback(function (nativeObject) {
    var scrollResponder = nativeObject && isFunc(nativeObject.getScrollResponder) ? nativeObject.getScrollResponder() : nativeObject;
    if ( scrollResponder) {
      isFunc(scrollResponder.getScrollableNode) && updateClassNames(scrollResponder.getScrollableNode(), classRef, defClass, className);
      isFunc(scrollResponder.getInnerViewNode) && updateClassNames(scrollResponder.getInnerViewNode(), classRef, "".concat(defClass, "-container"), innerClassName);
    }
    handleRefUpdate(ref, nativeObject);
  }, [defClass, className.join(' '), ref]);
};

export { useScrollClassName };
//# sourceMappingURL=useScrollClassName.js.map
