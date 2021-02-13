import { reStyle } from '@keg-hub/re-theme/reStyle'
import { View } from 'KegView'
import { getPlatform } from 'KegGetPlatform'

/**
 * @param { boolean } visible - true/false visibility
 * @param { number } height - adjustable height of view
 * @param { object } style - additional styles
 */
export const SelectView = reStyle(View)((theme, props) => ({
  height: props.height,
  position: 'absolute',
  backgroundColor: theme.colors.palette.white01,
  ...props.style,
  ...(getPlatform() === 'web'
    ? {
        display: props.visible ? 'block' : 'none',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }
    : {
        left: 0,
        top: 0,
      }),
}))
