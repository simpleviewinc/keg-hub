import { Mocks, Route } from 'SVMocks'
import React from 'react'
import renderer from 'react-test-renderer'

Mocks.setMocks({ components: { Route } })
const { ContainerRoutes } = require('../containerRoutes')

describe('containerRoutes', () => {
  it('empty routeConfigs', () => {
    const container = renderer.create(<ContainerRoutes routeConfigs={[]} />)

    expect(container.toJSON()).toBeNull()
  })

  it('non-empty routeConfigs', () => {
    const routes = [
      {
        path: '/keg',
        containerKey: 'home',
        exact: true,
      },
    ]
    const container = renderer.create(<ContainerRoutes routeConfigs={routes} />)

    expect(container.toJSON()).toBeTruthy()
  })
})
