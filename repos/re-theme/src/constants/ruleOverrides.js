export const ruleOverrides = {
  // Important rules should include the prefixed version
  // Because important rules are checked after going through the prefixer
  // Important rules have `!important` added to them to allow overwriting the style attribute
  important: [],

  // Filtered rules are not added to the Dom with CSS
  // They are filtered out and passed on to react-native-web to manage
  filter: [
    'aspectRatio',
    'elevation',
    'overlayColor',
    'resizeMode',
    'tintColor',
    'backgroundSize',
    'animationKeyframes',
    'placeholderTextColor',
    'pointerEvents',
    'scrollbarWidth',
  ],
}
