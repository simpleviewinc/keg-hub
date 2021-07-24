import { View } from 'KegView'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { noOpObj, isNum } from '@keg-hub/jsutils'
import { ChevronDown } from 'KegIcons/chevronDown'
import { reStyle } from '@keg-hub/re-theme/reStyle'

/**
 * Helper method to get the width of the sidebar from the passed in props
 * @function
 * @export
 * @public
 * @param {number} width - The width of the sidebar
 * @param {number} initial - The initial width of the sidebar if width is not passed in
 * @param {Object} styles - The styles object to pull the width from if it exists
 *
 * @returns {boolean} - If the animation should NOT run
 */
export const getSidebarWidth = (width, initial, styles=noOpObj) => {
  return isNum(width)
    ? width
    : isNum(styles?.main?.width)
      ? styles?.main?.width
      : isNum(initial)
        ? Math.abs(initial)
        : 200
}

/**
 * Restyles View component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 * @param {number} props.width - The width of the sidebar
 * @param {number} props.initial - The initial width of the sidebar if width is not passed in
 * @param {Object} props.styles - The styles object to pull the width from if it exists
 *
 * @returns {React.Component} - Wrapped reStyle View Component
 */
export const SidebarContainer = reStyle(View)((theme, props) => ({
  flex: 1,
  shadowRadius: 6,
  alignSelf: `stretch`,
  shadowOpacity: 0.05,
  shadowOffset: { width: 1, height: 12 },
  shadowColor: theme.colors.palette.black03,
  backgroundColor: theme.colors.palette.white01,
  width: getSidebarWidth(props.sidebarWidth, props.initial, props.styles),
}))

/**
 * Restyles View component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 *
 * @returns {React.Component} - Wrapped reStyle View Component
 */
export const ToggleMain = reStyle(View)({
  position: 'absolute',
})

/**
 * Restyles Touchable component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 *
 * @returns {React.Component} - Wrapped reStyle Touchable Component
 */
export const ToggleAction = reStyle(Touchable)((theme, props) => ({
  width: 20,
  top: `45vh`,
  minHeight: 50,
  shadowRadius: 2,
  shadowOpacity: 0.20,
  paddingVertical: 15,
  paddingHorizontal: 1,
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  borderRadius: 3,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  shadowOffset: { width: 2, height: 2 },
  shadowColor: theme.colors.palette.black03,
  backgroundColor: theme.colors.palette.black01,
  transitionDuration: '0.8s',
  transitionProperty: 'width height background-color',
  left: getSidebarWidth(props.sidebarWidth, props.initial, props.styles),
}))

/**
 * Restyles Icon component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 * @param {number} props.width - The width of the sidebar
 * @param {number} props.initial - The initial width of the sidebar if width is not passed in
 * @param {Object} props.styles - The styles object to pull the width from if it exists
 *
 * @returns {React.Component} - Wrapped reStyle Icon Component
 */
export const ToggleIcon = reStyle(ChevronDown)({
  left: -1,
  fontSize: 18,
  position: 'relative',
  transitionDuration: '0.8s',
  transitionProperty: 'width height transform stroke color',
})
