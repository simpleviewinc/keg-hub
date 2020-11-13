'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var handleRefUpdate = require('./handleRefUpdate.js');
var updateClassNames = require('./updateClassNames.js');

var useClassName = function useClassName(defClass, className, ref) {
  var classArr = jsutils.eitherArr(className, [className]);
  var classRef = React.useRef(classArr);
  return React.useCallback(function (element) {
     element && updateClassNames.updateClassNames(element, classRef, defClass, classArr);
    handleRefUpdate.handleRefUpdate(ref, element);
  }, [defClass, classArr.join(' '), ref]);
};

exports.useClassName = useClassName;
//# sourceMappingURL=useClassName-afee43f7.js.map
