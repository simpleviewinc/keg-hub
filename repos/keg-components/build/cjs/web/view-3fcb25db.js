'use strict';

var view_native = require('./view.native-895f9104.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var View = styleInjector.StyleInjector(view_native.View, {
  displayName: 'View',
  className: 'keg-view'
});
View.propTypes = view_native.View.propTypes;

exports.View = View;
//# sourceMappingURL=view-3fcb25db.js.map
