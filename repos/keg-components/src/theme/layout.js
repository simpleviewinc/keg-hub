import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const layout = (config = noOpObj) => {
  const defStyles = {
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
  }

  return (
    checkCall(config.layout, defStyles) || deepMerge(defStyles, config.layout)
  )
}
