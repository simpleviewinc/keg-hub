import { isObj } from '@svkeg/jsutils'

export const getStyles = (isWeb, styles) => {
  return isWeb ? (isObj(styles) && { styles }) || { styles: {} } : {}
}
