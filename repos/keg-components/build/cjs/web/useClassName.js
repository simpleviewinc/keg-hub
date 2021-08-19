'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var updateClassNames = require('./updateClassNames.js');
var ensureClassArray = require('./ensureClassArray.js');
var handleRefUpdate = require('./handleRefUpdate.js');
require('./_rollupPluginBabelHelpers-95f0bff4.js');
require('@keg-hub/jsutils');

var useClassName = function useClassName(defClass, className, ref) {
  var classArr = ensureClassArray.ensureClassArray(className);
  var classRef = React.useRef(classArr);
  return React.useCallback(function (element) {
    element && updateClassNames.updateClassNames(element, classRef, defClass, classArr);
    handleRefUpdate.handleRefUpdate(ref, element);
  }, [defClass, classArr.join(' '), ref]);
};

exports.useClassName = useClassName;
//# sourceMappingURL=useClassName.js.map
