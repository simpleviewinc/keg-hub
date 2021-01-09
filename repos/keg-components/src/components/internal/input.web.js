import React from 'react'
import { useClassName } from 'KegClassName'

/**
 * @summary Wrapper around the a web input element
 * <br/> This is required because we can't just pass input to the StyleInjector
 * <br/> It requires a React component, and input gets viewed as a variable
 * @param {Object} props - props object. Accepts all standard <input /> props which will be passed to the input element. Additional props:
 */
export const Input = React.forwardRef(({ className, ...props }, ref) => {
  const classRef = useClassName('keg-input', className, ref)

  return <input
    ref={classRef}
    {...props}
  />
})
