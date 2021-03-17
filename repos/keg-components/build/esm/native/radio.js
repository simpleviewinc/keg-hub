import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { withTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { Text } from './text.js';
import './kegText-f9567f63.js';
import './kegText.js';
import './useClassName.native-32e8827d.js';
import 'react-native';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';

var Radio = withTheme(function (props) {
  var theme = props.theme;
      props.children;
      var style = props.style;
      props.onClick;
      props.onPress;
      var text = props.text,
      args = _objectWithoutProperties(props, ["theme", "children", "style", "onClick", "onPress", "text"]);
  return React.createElement(Text, _extends({}, args, {
    style: [get(theme, ['form', 'radio']), style]
  }), text);
});

export { Radio };
//# sourceMappingURL=radio.js.map
