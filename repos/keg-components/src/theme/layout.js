import { deepMerge, noOpObj } from '@keg-hub/jsutils'

export const layout = (config=noOpObj) => {
  return deepMerge({
    full: {
      width: {
        width: '100%',
      },
      height: {
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
    grid: {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100%',
      },
      row: {
        flexWrap: 'wrap',
        minWidth: '100%',
      },
      column: {
        flexWrap: 'wrap',
      },
      columns: 12,
    },
  }, config.layout)
}
