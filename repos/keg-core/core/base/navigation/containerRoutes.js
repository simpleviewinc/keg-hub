import React from 'react'
import { RouterSwitch, Route } from 'KegComponents'
import * as containers from 'KegContainers'
import { PageNotFoundContainer } from '../containers/pageNotFound'
import { get } from '@keg-hub/jsutils'

/**
 * builds the react-router component based on the passed in configs
 * @param {Object} props
 * @property {Object} props.navigationConfigs - object of navigation configs
 * @property {Object=} props.defaultContainerName - default container to show if the Container DNE
 *
 * @returns {Array} - array of route components
 */
const buildRoutes = props => {
  const { navigationConfigs, defaultContainerName } = props

  if (!navigationConfigs) return null

  const RoutesArray = Object.entries(navigationConfigs).map(([ key, value ]) => {
    // find the Component from componentName
    // if Component doesnt exist, use the defaultContainer name for an error page
    // if defaultContainer doesnt exist, use the PageNotFoundContainer
    const Component = containers[value]
      ? containers[value]
      : defaultContainerName && defaultContainerName in containers
        ? containers[defaultContainerName]
        : PageNotFoundContainer

    return <Route
      exact
      key={key}
      path={key}
      component={Component}
    />
  })
  RoutesArray.push(
    <Route
      exact
      key={'*'}
      path={'*'}
      component={PageNotFoundContainer}
    />
  )
  return RoutesArray
}

/**
 * @summary Sets up the routes + containers to be used in the app or other containers
 * @param {Object} props
 * @property {Object} props.navigationConfigs - object of navigation configs
 * @property {Object=} props.defaultContainerName - default container to show if the Container DNE
 *
 * @returns {Component} - wrapper containing route components
 */
export const ContainerRoutes = React.memo(props => {
  const navigationConfigs = get(props, ['navigationConfigs'])
  if (!navigationConfigs) return null

  return <RouterSwitch>{ buildRoutes(props) }</RouterSwitch>
})
