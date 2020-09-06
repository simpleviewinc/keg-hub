import { TouchableOpacity } from 'react-native'
import { noOp, noOpObj } from '../../utils/helpers/noop'
import { useClassName } from '../../hooks/useClassName'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

export const Touchable = ({ className, dataSet, ref, ...props}) => {
  const touchRef = useClassName(className, dataSet, ref, 'keg-touchable')

  return (
    <TouchableOpacity
      ref={touchRef}
      {...props}
    />
  )
}