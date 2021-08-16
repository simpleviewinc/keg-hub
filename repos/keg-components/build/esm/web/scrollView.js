import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { u as useScrollClassName } from './useScrollClassName-31386e17.js';
import { ScrollView as ScrollView$2 } from 'react-native-web';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import '@keg-hub/jsutils';
import './handleRefUpdate.js';
import './updateClassNames.js';
import './ensureClassArray.js';

var _excluded = ["className", "innerClassName"];
var ScrollView$1 = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(ScrollView$2, _extends({}, props, {
    ref: classRef
  }));
});

var ScrollView = StyleInjector(ScrollView$1, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview'
});
ScrollView.propTypes = ScrollView$1.propTypes;

export { ScrollView };
//# sourceMappingURL=scrollView.js.map
