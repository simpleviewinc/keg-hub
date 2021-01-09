'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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
//# sourceMappingURL=useClassName-6b6da47b.js.map
