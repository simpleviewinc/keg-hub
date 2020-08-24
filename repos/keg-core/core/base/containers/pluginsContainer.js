import React, { useEffect } from 'react'
import { View, Button, Text } from 'SVComponents'
import { useTheme } from '@svkeg/re-theme'
import { get } from '@svkeg/jsutils'
import { loadFromLocalStorage } from 'SVUtils'
import { useSelector } from 'react-redux'
import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

// item paths to persist to local storage - this can be an array or a single string path
const persistKeys = [ 'click.test.count', 'click.test.halfCount' ]

// included in action payload to activate the local storage plugin
const persistFlag = { plugins: { localStorage: { persist: persistKeys } } }

// example of an action updating the store and local storage.
// The persist flag tells the LocalStorage plugin to persist the
// `count` and `halfCount` keys of the item
const upsertExample = count =>
  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: 'click',
      key: 'test',
      item: {
        count,
        halfCount: count / 2,
        notPersisted: 'not-persisted-to-storage',
      },
      ...persistFlag,
    },
  })

// example of an action removing the click count from the store and local storage
const removeExample = () =>
  dispatch({
    type: ActionTypes.REMOVE_ITEM,
    payload: { category: 'click', key: 'test', ...persistFlag },
  })

/**
 * Container for demonstrating plugins, including local storage
 * @param {object} props
 */
export const PluginsContainer = props => {
  useEffect(() => {
    persistKeys.map(path => loadFromLocalStorage({ path }))
  }, [])

  const clickCount = useSelector(store =>
    get(store.items, 'click.test.count', 0)
  )
  const halfCount = useSelector(store =>
    get(store.items, 'click.test.halfCount', 0)
  )
  const theme = useTheme()
  const margin = get(theme, 'margin.all')

  return (
    <>
      <View style={{ flexDirection: 'column', ...margin }}>
        <Button
          themePath='button.contained.primary'
          onPress={() => upsertExample(clickCount + 1)}
          styles={{ main: margin }}
        >
          Increment Count
        </Button>
        <Text style={{ ...margin, fontWeight: 'bold' }}>
          Count: { clickCount.toString() }
        </Text>
        <Text style={{ ...margin, fontWeight: 'bold' }}>
          Half Count: { halfCount.toString() }
        </Text>
        <Text style={margin}>
          Refresh page to see local storage preserve these properties
        </Text>
        <Button
          themePath='button.contained.primary'
          onPress={removeExample}
          styles={{ main: { width: 200, ...margin } }}
        >
          Reset local storage
        </Button>
      </View>
    </>
  )
}
