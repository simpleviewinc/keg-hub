import { c as _toConsumableArray } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import { ensureClassArray } from './ensureClassArray.js';

var updateClassNames = function updateClassNames(element, classesRef, defClass, className) {
  var _element$classList;
  if ( !('classList' in element)) return;
  defClass && element.classList.add(defClass);
  var classArr = ensureClassArray(className);
  classesRef.current.map(function (cls) {
    return cls && classArr.indexOf(cls) === -1 && element.classList.remove(cls);
  });
  classesRef.current = classArr;
  (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classArr));
};

export { updateClassNames };
//# sourceMappingURL=updateClassNames.js.map
