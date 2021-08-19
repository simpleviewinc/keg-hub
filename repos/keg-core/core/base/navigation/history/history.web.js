import { createMemoryHistory, createBrowserHistory } from 'history'
import { isStandalonePWA } from 'KegUtils/platform'

// use memoryHistory for PWA for access to Index - to work with isRootStack()
const history = isStandalonePWA()
  ? createMemoryHistory()
  : createBrowserHistory()

export const getHistory = () => history
