/****************** IMPORTANT ******************/ /*
 * This component is a work in progress
 * It's NOT complete or expected to be working
 * It is NOT exported from the main components export
 * It is NOT included in the keg-components bundle
/****************** IMPORTANT ******************/

import { unstable_createElement as RNCreateElement } from 'react-native'

export const createElement = (Element, props, ...children) => {
  const childs = props.children || children

  return RNCreateElement(Element, props, ...childs)
}
