import React, { Component } from 'react'
import { Provider } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'

export class HeadProvider extends Component {

  ids = new Map()

  canUseDOM = hasDomAccess()

  state = {

    addTag: (tag, id) => {
      const tags = this.ids.get(id) || []
      tags.push(tag)
      this.ids.set(id, tags)

      return tags.length - 1
    },

    shouldRender: (tag, index, id) => {
      return !this.state.hasId(tag, id)
    },

    removeTag: (tag, index, id) => {
      let tags = this.ids.get(id)
      index = index || tags.indexOf(tag)
      tags = index >= -1 && tags.splice(index, 1)

      !tags.length
        ? this.ids.delete(id)
        : this.ids.set(id, tags)
    },

    hasHash: hash => {
      const tags = this.ids.get(hash)
      return Boolean(tags && tags.length)
    },

    hasId: (tag, id) => {
      const tags = this.ids.get(id) || []

      if(tags.includes(tag)) return id

      // Have to add the tag here, otherwise other components
      // that use the same Id will not know it's already been registered
      this.state.addTag(tag, id)

      return false
    }
  }

  render() {
    return this.canUseDOM && (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}
