import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'

const sectionDefault = {
  main: {
    overscrollBehavior: 'contain',
  },
  content: {
    divider: {
      mT: 10,
      mB: 10,
    },
    hidden: {
      opacity: 0,
      maxH: 0,
      overflow: 'hidden',
    },
  },
}

export const sectionInit = (config = noOpObj) => {
  const defStyles = {
    default: sectionDefault,
  }

  const custom = get(config, 'list.section')

  return checkCall(custom, defStyles) || deepMerge(defStyles, custom)
}
