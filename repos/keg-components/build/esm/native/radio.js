import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './useTextAccessibility.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import { withTheme } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-ef69c4aa.js';
import { Text } from './text.js';

var Radio = withTheme(function (props) {
  var theme = props.theme,
      children = props.children,
      style = props.style,
      onClick = props.onClick,
      onPress = props.onPress,
      text = props.text,
      args = _objectWithoutProperties(props, ["theme", "children", "style", "onClick", "onPress", "text"]);
  return React__default.createElement(Text, _extends({}, args, {
    style: [get(theme, ['form', 'radio']), style]
  }), text);
});

export { Radio };
//# sourceMappingURL=radio.js.map
