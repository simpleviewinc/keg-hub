'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var view_native = require('./view.native-895f9104.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('./_rollupPluginBabelHelpers-95f0bff4.js');
require('react');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
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
