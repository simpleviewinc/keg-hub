import { colors } from 'SVTheme/colors'

// ----- Button ---- //
const button = {
  default: {
    padding: 8,
    borderRadius: 4,
  },
  outlined: {
    borderColor: colors.outlined,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  contained: {
    paddingHorizontal: 16,
    backgroundColor: colors.button.contained,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: colors.button.text,
  },
}
// ----- Touchable ---- //
const touchable = {
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0,
  },
  ripple: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleColor: colors.primary.dark,
}
// ----- StatusBar ---- //
const statusBar = {
  barStyle: 'dark-content',
}
// ----- List ---- //
const list = {}
// ----- ListItem ---- //
const listItem = {}
// ----- ListItem ---- //
const loading = {
  wrapper: {},
}

export const components = {
  button,
  list,
  listItem,
  loading,
  statusBar,
  touchable,
}
