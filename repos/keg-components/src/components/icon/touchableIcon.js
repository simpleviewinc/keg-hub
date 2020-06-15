import { Icon } from 'KegIcon'
import { withTouch } from '../../hocs'

/**
 * A simple wrapper around the Icon component that makes it touchable
 * @param { Object } props
 * @param { Object } props.wrapStyle - the style for the view (`TouchableOpacity`) that wraps the icon
 * @param { Function } props.onPress - callback for when the user presses the icon
 * @param { Function } props.* - props that are passed to <Icon />. @see The `Icon` component for more details
 */
export const TouchableIcon = withTouch(Icon)

TouchableIcon.propTypes = {
  ...TouchableIcon.propTypes,
  ...Icon.propTypes,
}
