import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const display = (config = noOpObj) => {
  const defStyles = {
    none: { display: 'none' },
    inline: { display: 'inline' },
    inlineBlock: { display: 'inline-block' },
    block: { display: 'block' },
    flex: { display: 'flex' },
    float: {
      left: { float: 'left' },
      right: { float: 'right' },
      none: { float: 'none' },
    },
    click: { cursor: 'pointer' },
    noRadius: { borderRadius: 0 },
  }

  return (
    checkCall(config.display, defStyles) || deepMerge(defStyles, config.display)
  )
}
