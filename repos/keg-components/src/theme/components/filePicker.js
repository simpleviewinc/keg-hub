import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const filePicker = (config = noOpObj) => {
  const defStyles = {
    default: {
      $all: {
        main: {
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        },
        content: {
          input: {
            opacity: 0,
            position: 'absolute',
            display: 'none',
          },

          view: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          },

          file: {
            marginLeft: 5,
            fontSize: 11,
          },

          button: {
            margin: 0,
          },
        },
      },
    },
    disabled: {},
    hover: {},
    active: {},
  }

  return {
    filePicker:
      checkCall(config.filePicker, defStyles) ||
      deepMerge(defStyles, config.filePicker),
  }
}
