'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var ensureClassArray = require('./ensureClassArray.js');
var handleRefUpdate = require('./handleRefUpdate.js');
var updateClassNames = require('./updateClassNames.js');

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
