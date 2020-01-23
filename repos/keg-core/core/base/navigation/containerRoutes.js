import React from 'react'
import { Route } from 'SVComponents'

/**
 * @summary Sets up the routes + containers to be used in the app or other containers
 * @param {Object} props
 * @property {[Object]} props.routeConfig
 * @property {String} props.routeconfig.path - path to register in your app
 * @property {String} props.routeConfig.key - key used to map to the proper Container
 * @property {Boolean} props.routeConfig.exact - whether to match the path exactly or not
 * @property {Object} props.containers - list of containers to check against
 *
 * @returns React.Component
 */
export const ContainerRoutes = props => {
  const { routeConfigs, containers } = props
  const routes = routeConfigs || []

  return routes.map((config, i) => (
    <Route key={i} config={config} containers={containers} />
  ))
}
