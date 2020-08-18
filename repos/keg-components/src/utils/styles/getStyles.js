import { isObj } from '@ltipton/jsutils'

export const getStyles = (isWeb, styles) => {
  return isWeb ? (isObj(styles) && { styles }) || { styles: {} } : {}
}
