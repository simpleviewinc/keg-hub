import { useStylesCallback } from './useStylesCallback'
import { useCss } from './useCss'

/**
 * Custom hook that calls useStylesCallback to get the styles Object
 * Then calls useCss hook to apply them to Dom in web, or build the dataSet props
 * When on native, will return a dataSet and style prop to be applied to the element
 * @example
 * const buildStyle = (theme, styles) => { return { ...theme.myComponent, ...styles } }
 * const { cssProps, styleProps } = useCssCallback(buildStyle, customStyles, [], { selector: rootClass })
 * <Style {...cssProps} />
 * <View {...styleProps} >My View</View>
 * 
 * @param {function} cssCb - Callback function to build the styles
 * @param {Array} cbDependencies - List of dependencies passed to useCallback hook for the stylesCb
 * @param {Object} [customStyles={}] - Custom styles to pass to the styles callback
 * @param {Object} config - Defines how the hook should build the dataSet and styles
 * @param {boolean} [config.inline=false] - Always return inline styles
 * @param {string} [config.selector=styleRef.$class] - Root css selector to use for all dataSet props overrides $class in theme
 * @param {string} config.prefix - Filters only theme objects that start with this prefix
 * @param {string|function} config.format - Template for building the css selector
 * 
 * @returns { Object } - Build Css props to br applied directly to React Components
 */
export const useCssCallback = (cssCb, cbDependencies, customStyles, config) => {
  const styleObj = useStylesCallback(cssCb, cbDependencies, customStyles)
  return useCss(styleObj, customStyles, config)
}
