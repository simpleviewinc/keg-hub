'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var ensureClassArray = require('./ensureClassArray.js');

var updateClassNames = function updateClassNames(element, classesRef, defClass, className) {
  var _element$classList;
  if ( !('classList' in element)) return;
  defClass && (_element$classList = element.classList).add.apply(_element$classList, _rollupPluginBabelHelpers._toConsumableArray(defClass.split(' ')));
  var classArr = ensureClassArray.ensureClassArray(className);
  classesRef.current.map(function (cls) {
    var _element$classList2;
    return cls && classArr.indexOf(cls) === -1 && (_element$classList2 = element.classList).remove.apply(_element$classList2, _rollupPluginBabelHelpers._toConsumableArray(cls.split(' ')));
  });
  classesRef.current = classArr;
  classArr.map(function (cls) {
    var _element$classList3;
    return (_element$classList3 = element.classList).add.apply(_element$classList3, _rollupPluginBabelHelpers._toConsumableArray(cls.split(' ')));
  });
};

exports.updateClassNames = updateClassNames;
//# sourceMappingURL=updateClassNames.js.map
