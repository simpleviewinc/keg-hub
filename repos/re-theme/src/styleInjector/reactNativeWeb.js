/**
 * IMPORTANT -- Uses internal react-native-web methods to keep bundle size down
 *   - If this code is ever removed from react-native-web
 *   - We'll need to add it into ReTheme, or come up with a different solution
*/
import prefixStyles from 'react-native-web/dist/cjs/modules/prefixStyles'
import flattenArray from 'react-native-web/dist/cjs/modules/flattenArray'
import flattenStyle from 'react-native-web/dist/cjs/exports/StyleSheet/flattenStyle'
import createReactDOMStyle from 'react-native-web/dist/cjs/exports/StyleSheet/createReactDOMStyle'
import createCompileableStyle from 'react-native-web/dist/cjs/exports/StyleSheet/createCompileableStyle'

export {
  createReactDOMStyle,
  createCompileableStyle,
  flattenStyle,
  flattenArray,
  prefixStyles,
}