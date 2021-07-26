import { View } from 'KegView'
import { Touchable } from '../../touchable'
import { Text } from '../../typography/text'
import { Grid } from '../../layout/grid'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { Drawer } from '../../drawer'
import { deepMerge } from '@keg-hub/jsutils'
import { ListItem } from './listItem'
import { ListHeader } from './listHeader'

const shared = theme => {
  return {
    default: {
      main: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
      },
      row: {
        ...theme.flex.justify.between,
        ...theme.flex.align.center,
        pV: theme.padding.size / 1.5,
        pH: theme.padding.size,
      },
      title: {
        ...theme.transition([ 'color' ], 0.5),
        fontWeight: 'bold',
        letterSpacing: 1,
      }
    },
    active: {
      main: {},
      title: {},
    },
    hover: {
      main: {},
      title: {},
    }
  }
}

export const GridList = reStyle(Grid)(theme => ({
  ...theme.flex.column
}))

export const SimpleItemList = reStyle(Drawer, 'styles')((_, { drawerStyles, styles, toggled }) => deepMerge(
  styles?.drawer,
  drawerStyles?.styles,
  toggled && styles?.drawer?.toggled,
  toggled && drawerStyles?.styles?.toggled,
))

export const SimpleItem = reStyle(ListItem, 'styles')(theme => {
  const sharedStyle = shared(theme)
  return {
    default: {
      ...sharedStyle.default,
      main: sharedStyle.default.main,
      row: {
        ...sharedStyle.default.row,
        padding: theme.padding.size,
        pL: theme.padding.size * 2,
      },
      avatar: {},
      icon: {},
      title: {
        ...sharedStyle.default.title,
        fontSize: 12,
        color:  theme.colors.palette.gray02,
      },
      actions: {
        main: {},
        action: {
          main: {},
        }
      }
    }
  }
})

export const SimpleHeader = reStyle(ListHeader, 'styles')(theme => deepMerge(shared(theme), {
  default: {
    main: {
      backgroundColor: theme.colors.palette.white01,
      borderTopColor: theme.colors.palette.gray02,
      borderTopWidth: 1,
    },
    title: {
      color:  theme.colors.palette.gray02,
    },
    toggle: {
      main: {
        color:  theme.colors.palette.gray02,
      }
    },
    first: {
      main: {
        borderTopWidth: 0,
      }
    }
  },
  active: {
    main: {
      borderBottomColor: theme.colors.palette.gray02,
      borderBottomWidth: 1,
    }
  }
}))