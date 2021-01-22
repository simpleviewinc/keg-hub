import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { exists } from '@keg-hub/jsutils';

var scrollList = function scrollList(_ref) {
  var top = _ref.top,
      left = _ref.left,
      _ref$behavior = _ref.behavior,
      behavior = _ref$behavior === void 0 ? 'smooth' : _ref$behavior;
  window.scroll(_objectSpread2(_objectSpread2({
    behavior: behavior
  }, exists(top) && {
    top: top
  }), exists(left) && {
    left: left
  }));
};

export { scrollList };
//# sourceMappingURL=scrollList.js.map
