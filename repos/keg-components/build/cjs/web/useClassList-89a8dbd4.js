'use strict';

var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var ensureClassArray = require('./ensureClassArray.js');

var useClassList = function useClassList(className) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noPropArr;
  var classListArr = jsutils.eitherArr(classList, [classList]);
  return React.useMemo(function () {
    return ensureClassArray.ensureClassArray(classListArr).concat(ensureClassArray.ensureClassArray(className));
  }, [className, classListArr.join(' ')]);
};

exports.useClassList = useClassList;
//# sourceMappingURL=useClassList-89a8dbd4.js.map
