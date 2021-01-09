import React from 'react'

/**
 * Stub for Native StyleInjector calls, just renders the component
 */
export const StyleInjector = Component => props => <Component {...props} />

/**
 * Stub for Native useStyleTag calls, just returns the className
 */
export const useStyleTag = (_, className = '') => className
