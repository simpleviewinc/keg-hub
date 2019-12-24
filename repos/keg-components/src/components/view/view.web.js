import React from 'react'

export const View = ({ children, ...props }) => (
  <div { ...props } >
    { children }
  </div>
)