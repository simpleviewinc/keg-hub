import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { reStyle } from '@keg-hub/re-theme/reStyle';
import { V as View } from './view-9c41ec1e.js';
import './view.native-2491eb60.js';
import 'react';
import 'react-native-web';
import './useClassName-ed83df40.js';
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
