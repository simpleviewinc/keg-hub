import React, { useMemo } from 'react'
import { capitalize } from '@keg-hub/jsutils'
import { KegText as NativeText } from './kegText.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { useTextStyles } from '../../../hooks/useTextStyles'

/**
 * @summary Custom hook to memoize the Text component
 *
 * @param {string} element - Name of the text element
 */
const useTextComponent = element => {
  return useMemo(() => {
    return StyleInjector(NativeText(element), {
      displayName: capitalize(element),
      className: `keg-${element}`,
    })
  }, [element])
}

/**
 * KegText
 * @summary KegText component that wraps the KegText Native Text component to allow injecting styles
 *
 * @param {string} element - Name of the text element
 */
export const KegText = element => {
  return React.forwardRef((props, ref) => {
    const textStyles = useTextStyles(element)
    const Text = useTextComponent(element)

    return <Text
      {...props}
      style={[ textStyles, props.style ]}
      ref={ref}
    />
  })
}

KegText.propTypes = NativeText.propTypes
