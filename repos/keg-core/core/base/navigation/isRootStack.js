import { getHistory } from 'SVNavigation/history'
/**
 * Checks whether we are on the root of the navigation stack
 * NOTE: (only works on PWA and Native) because of how the History obj works
 *
 * @returns {Boolean} - if we're in root or not
 */
export const isRootStack = () => {
  const history = getHistory()
  return history ? history.index === 0 : false
}
