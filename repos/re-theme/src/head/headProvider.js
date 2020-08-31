import React, { Component } from 'react'
import { Provider } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { isArr, checkCall } from '@svkeg/jsutils'

const cascadingTags = ['title', 'meta']

export class HeadProvider extends Component {

  indices = new Map()

  canUseDOM = hasDomAccess()

  state = {

    addTag: (tag, name) => {
      if (cascadingTags.indexOf(tag) === -1) return -1

      this.setState(state => ({ [tag]: [ ...(state[tag] || []), name ] }))

      const { indices } = this
      const index = indices.has(tag) ? indices.get(tag) + 1 : 0
      indices.set(tag, index)

      return index
    },

    shouldRender: (tag, index) => {
      if (cascadingTags.indexOf(tag) === -1) return true
    
      // check if the tag is the last one of similar
      const names = this.state[tag]
      return names && names.lastIndexOf(names[index]) === index
    },

    removeTag: (tag, index) => {
      this.setState(state => {
        if(!state[tag]) return null

        state[tag][index] = null

        return { [tag]: state[tag] }
      })
    },
  }

  render() {
    return this.canUseDOM && (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}
