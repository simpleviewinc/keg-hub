import React from 'react'
import { getComponentWithKey } from 'SVUtils/helpers'
import PropTypes from 'prop-types'
import { Route as RRoute } from 'react-router-native'

/**
 * Sets up an Route based on the passed in routeConfig
 *
 * @param {Object} props - see routeWithConfigPropTypes
 * @property {routeConfig} props.config
 * @property {String} props.routeconfig.path - path to register in your app
 * @property {String} props.routeConfig.key - key used to map to the proper Container
 * @property {Boolean} props.routeConfig.exact - whether to match the path exactly or not
 * @property {Object} props.containers - list of containers to check against
 *
 * @returns Route component
 */
export const Route = props => {
  const { config, containers } = props

  const Component = getComponentWithKey(config.containerKey, containers)

  return (
    <RRoute
      exact={config.exact}
      path={config.path}
      render={props => <Component {...props} />}
    />
  )
}

Route.propTypes = {
  config: PropTypes.object,
  containers: PropTypes.object,
}
