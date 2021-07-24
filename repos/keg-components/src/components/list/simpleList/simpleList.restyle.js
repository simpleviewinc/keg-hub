import { View } from 'KegView'
import { Touchable } from '../../touchable'
import { Text } from '../../typography/text'
import { Grid } from '../../layout/grid'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { Drawer } from '../../drawer'
import { deepMerge } from '@keg-hub/jsutils'

export const GridList = reStyle(Grid)(theme => ({
  ...theme.flex.column
}))

export const DrawerList = reStyle(Drawer, 'styles')((_, { drawerStyles, styles, toggled }) => deepMerge(
  styles?.drawer,
  drawerStyles?.styles,
  toggled && styles?.drawer?.toggled,
  toggled && drawerStyles?.styles?.toggled,
))
