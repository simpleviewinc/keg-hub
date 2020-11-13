import { deepMerge, noOpObj } from '@keg-hub/jsutils'

export const display = (config=noOpObj) => {
  return deepMerge({
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
  }, config.display)
}
