import { Icon } from 'KegIcon'
import { withPressable } from '../../hocs'
import { Touchable } from '../touchable'

/**
 * A simple wrapper around the Icon component that makes it touchable
 * @param { Object } props
 * @param { Object } props.wrapStyle - the style for the view (`TouchableOpacity`) that wraps the icon
 * @param { Function } props.onPress - callback for when the user presses the icon
 * @param { Function } props.* - props that are passed to <Icon />. @see The `Icon` component for more details
 */
export const TouchableIcon = withPressable(Icon)

TouchableIcon.propTypes = {
  ...Touchable.propTypes,
  ...Icon.propTypes,
}
