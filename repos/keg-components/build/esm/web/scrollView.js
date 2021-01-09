import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import React__default, { useCallback, useRef } from 'react';
import { ensureClassArray } from './ensureClassArray.js';
import { handleRefUpdate } from './handleRefUpdate.js';
import { updateClassNames } from './updateClassNames.js';
import { ScrollView as ScrollView$2 } from 'react-native';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';

var useScrollClassNames = function useScrollClassNames(defClass, className, innerClassName, ref) {
  className = ensureClassArray(className);
  var classRef = useRef(className);
  return useCallback(function (scrollResponder) {
    if ( scrollResponder) {
      updateClassNames(scrollResponder.getScrollableNode(), classRef, defClass, className);
      updateClassNames(scrollResponder.getInnerViewNode(), classRef, "".concat(defClass, "-container"), innerClassName);
    }
    handleRefUpdate(ref, scrollResponder);
  }, [defClass, className.join(' '), ref]);
};
var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassNames('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(ScrollView$2, _extends({}, props, {
    ref: classRef
  }));
});

var ScrollView$1 = StyleInjector(ScrollView, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview'
});
ScrollView$1.propTypes = ScrollView.propTypes;

export { ScrollView$1 as ScrollView };
//# sourceMappingURL=scrollView.js.map
