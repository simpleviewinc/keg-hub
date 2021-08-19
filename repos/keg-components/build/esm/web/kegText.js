import { e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default, { useMemo } from 'react';
import { capitalize } from '@keg-hub/jsutils';
import { K as KegText$1 } from './kegText.native-6bbad9e4.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { useTextStyles } from './useTextStyles.js';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import 'react-native-web';
import './useTextAccessibility.js';
import '@keg-hub/re-theme';

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
