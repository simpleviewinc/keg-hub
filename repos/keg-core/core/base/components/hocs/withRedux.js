import React from 'react'
import { Provider } from 'react-redux'

/**
 * Wraps the component with a provider and store
 *
 * @param {Object} Component - React component to be wrapped
 * @param {Object} store - Redux Store
 * @returns {function} - wrapped functional component
 */
export const withRedux = (Component, store) => {
  const ReduxHoc = props => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }

  return ReduxHoc
}
