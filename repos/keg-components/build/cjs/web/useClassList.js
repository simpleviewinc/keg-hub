'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var ensureClassArray = require('./ensureClassArray.js');

var useClassList = function useClassList(className) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noPropArr;
  var classListArr = jsutils.eitherArr(classList, [classList]);
  return React.useMemo(function () {
    return ensureClassArray.ensureClassArray(classListArr).concat(ensureClassArray.ensureClassArray(className));
  }, [className, classListArr.join(' ')]);
};

exports.useClassList = useClassList;
//# sourceMappingURL=useClassList.js.map
