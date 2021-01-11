import { flex } from '../flex'
import { get } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../themeDefaults'

export const initSharedToggle = config => {
  const { form, margin } = getThemeDefaults()
  const space = get(form, 'checkbox.space', 15)
  const height = get(form, 'switch.height', 20)

  return {
    container: {
      ...flex.display,
      ...flex.row,
      flexWrap: 'nowrap',
    },
    text: {
      $all: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height + space,
      },
    },
    left: {
      marginRight: margin.size,
    },
    right: {
      marginLeft: margin.size,
    },
  }
}
