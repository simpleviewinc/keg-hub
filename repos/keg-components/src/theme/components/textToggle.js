import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const textToggle = (config = noOpObj) => {
  const defStyles = {
    main: {
      fl: 1,
    },
    textContainer: {},
    text: {
      ftSz: 20,
    },
    linearGradient: {
      pos: 'absolute',
      bt: 40,
      lt: 0,
      rt: 0,
      height: 50,
    },
    drawer: {
      main: {
        ovf: 'hidden',
        width: '100%',
      },
    },
    toggleComponent: {
      main: {
        mV: 15,
        alI: 'flex-end',
      },
      text: {
        txDL: 'underline',
      },
    },
  }

  return {
    textToggle:
      checkCall(config.textToggle, defStyles) ||
      deepMerge(defStyles, config.textToggle),
  }
}
