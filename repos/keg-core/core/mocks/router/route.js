import React from 'react'
import { View } from 'react-native'

export const Route = jest.fn(config => {
  return <View {...config} />
})
