import { c as _toConsumableArray } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import { ensureClassArray } from './ensureClassArray.js';

var updateClassNames = function updateClassNames(element, classesRef, defClass, className) {
  var _element$classList;
  if ( !('classList' in element)) return;
  defClass && (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(defClass.split(' ')));
  var classArr = ensureClassArray(className);
  classesRef.current.map(function (cls) {
    var _element$classList2;
    return cls && classArr.indexOf(cls) === -1 && (_element$classList2 = element.classList).remove.apply(_element$classList2, _toConsumableArray(cls.split(' ')));
  });
  classesRef.current = classArr;
  classArr.map(function (cls) {
    var _element$classList3;
    return (_element$classList3 = element.classList).add.apply(_element$classList3, _toConsumableArray(cls.split(' ')));
  });
};

export { updateClassNames };
//# sourceMappingURL=updateClassNames.js.map
