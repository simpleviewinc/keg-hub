import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { exists } from '@keg-hub/jsutils';

var scrollList = function scrollList(_ref) {
  var _listRef$current;
  var listRef = _ref.listRef,
      _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? true : _ref$animated,
      top = _ref.top,
      left = _ref.left;
  return listRef === null || listRef === void 0 ? void 0 : (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(_objectSpread2(_objectSpread2({
    animated: animated
  }, exists(top) && {
    y: top
  }), exists(left) && {
    x: left
  }));
};

export { scrollList };
//# sourceMappingURL=scrollList.js.map
