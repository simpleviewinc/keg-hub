'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var view_native = require('./view.native-99366b4b.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('./_rollupPluginBabelHelpers-bb55ccbe.js');
require('react');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('@keg-hub/jsutils');
require('./handleRefUpdate.js');

var View = styleInjector.StyleInjector(view_native.View, {
  displayName: 'View',
  className: 'keg-view'
});
View.propTypes = view_native.View.propTypes;

exports.View = View;
//# sourceMappingURL=view.js.map
