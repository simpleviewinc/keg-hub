'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var ensureClassArray = require('./ensureClassArray.js');

var updateClassNames = function updateClassNames(element, classesRef, defClass, className) {
  var _element$classList;
  if ( !('classList' in element)) return;
  defClass && element.classList.add(defClass);
  var classArr = ensureClassArray.ensureClassArray(className);
  classesRef.current.map(function (cls) {
    return cls && classArr.indexOf(cls) === -1 && element.classList.remove(cls);
  });
  classesRef.current = classArr;
  (_element$classList = element.classList).add.apply(_element$classList, _rollupPluginBabelHelpers._toConsumableArray(classArr));
};

exports.updateClassNames = updateClassNames;
//# sourceMappingURL=updateClassNames.js.map
