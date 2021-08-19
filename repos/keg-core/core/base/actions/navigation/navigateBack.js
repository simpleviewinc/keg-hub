import { getHistory } from 'KegNavigation/history'

/**
 * Called when you want to navigate back from the route stack
 *
 * @returns {void}
 */
export const navigateBack = () => {
  getHistory().goBack()
}
