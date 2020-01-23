import React from 'react'
import { Mocks, Route } from 'SVMocks'
import { View } from 'react-native'

const PageNotFoundContainer = () => {
  return <View />
}
const AppContainer = () => {
  return <View />
}
const CustomPageNotFoundContainer = () => {
  return <View />
}

const Containers = {
  PageNotFoundContainer,
  AppContainer,
  CustomPageNotFoundContainer,
}

Mocks.setMocks({ components: Route, containers: Containers })
const { getComponentWithKey } = require('SVUtils/helpers')

describe('getComponentForKey', () => {
  it('is a valid KeyMap', () => {
    // intro key is mapped to a valid Container, it should return 'IntroContainer'
    const Component = getComponentWithKey('root')

    expect(Component).toEqual(AppContainer)
  })

  it('is NOT a valid KeyMap & did not provide default Container', () => {
    // find a component with Key that hasn't been mapped in the keg/tap json mapping
    const Component = getComponentWithKey('someNonExistentKey')

    // default to use 'PageNotFoundContainer'
    expect(Component).toEqual(PageNotFoundContainer)
  })

  it('is NOT a valid containerKey & provided VALID default Container', () => {
    // find a component with Key that hasn't been mapped in the keg/tap json mapping
    const Component = getComponentWithKey(
      'someNonExistentKey',
      Containers,
      'CustomPageNotFoundContainer'
    )

    // default to use 'CustomPageNotFoundContainer'
    expect(Component).toEqual(CustomPageNotFoundContainer)
  })

  it('is NOT a valid containerKey & provided INVALID default Container', () => {
    const Component = getComponentWithKey(
      'someNonExistentKey',
      Containers,
      'InvalidContainer'
    )

    // default to use 'PageNotFoundContainer'
    expect(Component).toEqual(PageNotFoundContainer)
  })
})
