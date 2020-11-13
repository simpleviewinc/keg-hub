'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('react');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-afee43f7.js');
var view_native = require('./view.native-b2081485.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var View = styleInjector.StyleInjector(view_native.View, {
  displayName: 'View',
  className: 'keg-view'
});
View.propTypes = view_native.View.propTypes;

exports.View = View;
//# sourceMappingURL=view.js.map
