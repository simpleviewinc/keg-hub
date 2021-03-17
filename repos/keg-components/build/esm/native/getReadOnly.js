import { a as _defineProperty } from './_rollupPluginBabelHelpers-b6f65682.js';

var getReadOnly = function getReadOnly(isWeb, readOnly, disabled) {
  var editable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var key = isWeb ? 'disabled' : 'editable';
  var value = isWeb ? readOnly || disabled || !editable : !(readOnly || disabled || !editable);
  return _defineProperty({}, key, value);
};

export { getReadOnly };
//# sourceMappingURL=getReadOnly.js.map
