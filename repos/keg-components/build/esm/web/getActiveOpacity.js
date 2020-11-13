var getActiveOpacity = function getActiveOpacity(isWeb, props, style) {
  return !isWeb ? {
    activeOpacity: props.activeOpacity || props.opacity || style && style.opacity || 0.3,
    accessibilityRole: 'button'
  } : {};
};

export { getActiveOpacity };
//# sourceMappingURL=getActiveOpacity.js.map
