import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { u as useScrollClassName } from './useScrollClassName-2b12cd9f.js';
import { ScrollView as ScrollView$2 } from 'react-native';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import '@keg-hub/jsutils';
import './handleRefUpdate.js';
import './updateClassNames.js';
import './ensureClassArray.js';

var ScrollView$1 = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React.createElement(ScrollView$2, _extends({}, props, {
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
