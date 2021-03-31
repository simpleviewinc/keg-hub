import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import { reStyle } from '@keg-hub/re-theme/reStyle';
import { V as View } from './view-2274aefb.js';
import './view.native-a7f08b5b.js';
import 'react';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import '@keg-hub/jsutils';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';

var SelectView = reStyle(View)(function (_, props) {
  return _objectSpread2({
    height: props.height
  }, {
    display: props.visible ? 'block' : 'none',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  } );
});

export { SelectView };
//# sourceMappingURL=selectView.js.map
