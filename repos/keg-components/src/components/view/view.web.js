import React from 'react'

export const View = React.forwardRef(({ children, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
  >
    { children }
  </div>
))
