import './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { eitherArr } from '@keg-hub/jsutils';
import { useRef, useCallback } from 'react';
import './ensureClassArray.js';
import { handleRefUpdate } from './handleRefUpdate.js';
import { updateClassNames } from './updateClassNames.js';

var useClassName = function useClassName(defClass, className, ref) {
  var classArr = eitherArr(className, [className]);
  var classRef = useRef(classArr);
  return useCallback(function (element) {
     element && updateClassNames(element, classRef, defClass, classArr);
    handleRefUpdate(ref, element);
  }, [defClass, classArr.join(' '), ref]);
};

export { useClassName };
//# sourceMappingURL=useClassName.js.map
