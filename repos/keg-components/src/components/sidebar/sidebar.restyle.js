import { View } from 'KegView'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { noOpObj, isNum } from '@keg-hub/jsutils'
import { ChevronDown } from 'KegIcons/chevronDown'
import { reStyle } from '@keg-hub/re-theme/reStyle'

export const getSidebarWidth = (width, initial, styles=noOpObj) => {
  return isNum(width)
    ? width
    : isNum(styles?.main?.width)
      ? styles?.main?.width
      : isNum(initial)
        ? Math.abs(initial)
        : 200
}

export const SidebarContainer = reStyle(View)((theme, props) => {
  return {
    flex: 1,
    shadowRadius: 6,
    alignSelf: `stretch`,
    shadowOpacity: 0.05,
    shadowOffset: { width: 1, height: 12 },
    shadowColor: theme.colors.palette.black03,
    backgroundColor: theme.colors.palette.white01,
    width: getSidebarWidth(props.sidebarWidth, props.initial, props.styles),
  }
})

export const ToggleMain = reStyle(View)((theme, props) => {
  return {
    position: 'absolute',
  }
})

export const ToggleAction = reStyle(Touchable)((theme, props) => {
  return {
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
  }
})
export const ToggleContent = reStyle(View)((theme, props) => {
  return {

  }
})

export const ToggleText = reStyle(Text)((theme, props) => {
  return {

  }
})

export const ToggleIcon = reStyle(ChevronDown)((theme, props) => {
  return {
    left: -1,
    fontSize: 18,
    position: 'relative',
    transitionDuration: '0.8s',
    transitionProperty: 'width height transform stroke color',
  }
})
