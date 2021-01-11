import { e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { capitalize } from '@keg-hub/jsutils';
import React__default, { useMemo } from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import './useTextAccessibility.js';
import { K as KegText$1 } from './kegText.native-231e3dc9.js';
import '@keg-hub/re-theme';
import { useTextStyles } from './useTextStyles.js';

var useTextComponent = function useTextComponent(element) {
  return useMemo(function () {
    return StyleInjector(KegText$1(element), {
      displayName: capitalize(element),
      className: "keg-".concat(element)
    });
  }, [element]);
};
var KegText = function KegText(element) {
  return React__default.forwardRef(function (props, ref) {
    var textStyles = useTextStyles(element);
    var Text = useTextComponent(element);
    return React__default.createElement(Text, _extends({}, props, {
      style: [textStyles, props.style],
      ref: ref
    }));
  });
};

export { KegText };
//# sourceMappingURL=kegText.js.map
