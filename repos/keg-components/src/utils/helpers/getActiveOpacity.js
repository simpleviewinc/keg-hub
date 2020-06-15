export const getActiveOpacity = (isWeb, props, style) => {
  // Check if opacity is passed from the props, or use the opacity from disabled styles
  return !isWeb
    ? {
        activeOpacity:
          props.activeOpacity ||
          props.opacity ||
          (style && style.opacity) ||
          0.3,
        accessibilityRole: 'button',
      }
    : {}
}
