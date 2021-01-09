import { eitherArr, noPropArr } from '@keg-hub/jsutils';
import { useMemo } from 'react';
import { ensureClassArray } from './ensureClassArray.js';

var useClassList = function useClassList(className) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noPropArr;
  var classListArr = eitherArr(classList, [classList]);
  return useMemo(function () {
    return ensureClassArray(classListArr).concat(ensureClassArray(className));
  }, [className, classListArr.join(' ')]);
};

export { useClassList };
//# sourceMappingURL=useClassList.js.map
