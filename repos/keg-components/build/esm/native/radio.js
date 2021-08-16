import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { withTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { Text } from './text.js';
import './kegText-97d3d571.js';
import './kegText.js';
import './useClassName.native-32e8827d.js';
import 'react-native';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';

var _excluded = ["theme", "children", "style", "onClick", "onPress", "text"];
var Radio = withTheme(function (props) {
  var theme = props.theme;
      props.children;
      var style = props.style;
      props.onClick;
      props.onPress;
      var text = props.text,
      args = _objectWithoutProperties(props, _excluded);
  return React__default.createElement(Text, _extends({}, args, {
    style: [get(theme, ['form', 'radio']), style]
  }), text);
});

export { Radio };
//# sourceMappingURL=radio.js.map
