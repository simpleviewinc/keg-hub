'use strict';

var view_native = require('./view.native-99366b4b.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var View = styleInjector.StyleInjector(view_native.View, {
  displayName: 'View',
  className: 'keg-view'
});
View.propTypes = view_native.View.propTypes;

exports.View = View;
//# sourceMappingURL=view-276572bd.js.map
