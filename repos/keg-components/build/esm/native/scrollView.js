import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import React__default, { useCallback, useRef } from 'react';
import { ensureClassArray } from './ensureClassArray.js';
import { handleRefUpdate } from './handleRefUpdate.js';
import { ScrollView as ScrollView$1 } from 'react-native';

var useScrollClassNames = function useScrollClassNames(defClass, className, innerClassName, ref) {
  className = ensureClassArray(className);
  var classRef = useRef(className);
  return useCallback(function (scrollResponder) {
    handleRefUpdate(ref, scrollResponder);
  }, [defClass, className.join(' '), ref]);
};
var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassNames('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(ScrollView$1, _extends({}, props, {
    ref: classRef
  }));
});

export { ScrollView };
//# sourceMappingURL=scrollView.js.map
