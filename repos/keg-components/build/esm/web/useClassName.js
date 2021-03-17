import { useRef, useCallback } from 'react';
import { updateClassNames } from './updateClassNames.js';
import { ensureClassArray } from './ensureClassArray.js';
import { handleRefUpdate } from './handleRefUpdate.js';
import './_rollupPluginBabelHelpers-b6f65682.js';
import '@keg-hub/jsutils';

var useClassName = function useClassName(defClass, className, ref) {
  var classArr = ensureClassArray(className);
  var classRef = useRef(classArr);
  return useCallback(function (element) {
    element && updateClassNames(element, classRef, defClass, classArr);
    handleRefUpdate(ref, element);
  }, [defClass, classArr.join(' '), ref]);
};

export { useClassName };
//# sourceMappingURL=useClassName.js.map
