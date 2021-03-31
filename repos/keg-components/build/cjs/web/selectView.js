'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var reStyle = require('@keg-hub/re-theme/reStyle');
var view = require('./view-276572bd.js');
require('./view.native-99366b4b.js');
require('react');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('@keg-hub/jsutils');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

var SelectView = reStyle.reStyle(view.View)(function (_, props) {
  return _rollupPluginBabelHelpers._objectSpread2({
    height: props.height
  }, {
    display: props.visible ? 'block' : 'none',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  } );
});

exports.SelectView = SelectView;
//# sourceMappingURL=selectView.js.map
