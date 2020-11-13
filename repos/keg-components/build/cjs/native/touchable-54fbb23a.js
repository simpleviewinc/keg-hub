'use strict';

require('react');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var touchable = require('./touchable.js');

var Touchable = styleInjector.StyleInjector(touchable.Touchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable.propTypes = touchable.Touchable.propTypes;

exports.Touchable = Touchable;
//# sourceMappingURL=touchable-54fbb23a.js.map
