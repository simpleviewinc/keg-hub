import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import React__default from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import { ScrollView as ScrollView$2 } from 'react-native';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { u as useScrollClassName } from './useScrollClassName-08a313a5.js';

var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName('keg-scrollview', className, innerClassName, ref);
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
