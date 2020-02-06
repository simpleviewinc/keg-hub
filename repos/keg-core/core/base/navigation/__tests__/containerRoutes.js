import { Mocks, RouterSwitch, Route } from 'SVMocks'
import React from 'react'
import renderer from 'react-test-renderer'

Mocks.setMocks({ components: { RouterSwitch, Route } })
const { ContainerRoutes } = require('../containerRoutes')

describe('containerRoutes', () => {
  it('empty routeConfigs', () => {
    const container = renderer.create(<ContainerRoutes navigationConfigs={null} />)

    expect(container.toJSON()).toBeNull()
  })

  it('non-empty routeConfigs', () => {
    const navigationConfigs = {
      "navigation": {
        "/": "HomeContainer",
        "/examples": "ExamplesContainer",
        "/blue": "BlueContainer",
        "/green": "GreenContainer",
        "/user/:id": "UserContainer"
      }
    }
    const container = renderer.create(<ContainerRoutes navigationConfigs={navigationConfigs} />)
    expect(container.toJSON()).toBeTruthy()
  })
})
