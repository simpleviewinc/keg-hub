import { isObj } from '@keg-hub/jsutils'

export const getStyles = (isWeb, styles) => {
  return isWeb ? (isObj(styles) && { styles }) || { styles: {} } : {}
}
