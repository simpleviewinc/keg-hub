# Reducers Overview 

`keg-core` has 3 reducers:
* `app`
  * handles core-specific data, such as the initialization status.
  * only accessible to keg-core. Tap developers should use the items reducer.
* `items`
  * the primary reducer that taps will use (usually the only one)
  * dispatches on upsert, remove, and replace actions
  * structure is similar to a relational database
* `tap`
  `* tap developers can overwrite this reducer if they need to implement behavior the `items` reducer does not support

#### Items state

* The items subtree of the redux store is composed of collections called categories
* You can choose to make a category either a object or an array
* Example:
```javascript
store: {
  users: [
    { id: '0921', name: 'Michael', organization: 123 },
    { id: '8305', name: 'Daniel', organization: 123 }
  ],  
  organizations: {
    123: {
      name: 'Simpleview'
    }
  }
}
```
* `category` is similar to a table in a relational database

>Note: we don't force you to treat a category like a collection of items. If you wish to put a single item at the root level, you can do that too:
```javascript
store: {
  ...,
  selectedProduct: { name: "Legos", type: "Toy" }
}
```

##### Actions
* There are five action types on which the `items` reducer can dispatch:
  * [UPSERT_ITEMS](./core/base/reducers/items/upsertItems.js)
    * inserts or updates a collection of items by its category name into the store
    * if the category already exists, it will merge the collection with the new items
    * payload: `category`, `items`
    * example:
      ```javascript
        // before: { users: { 999: { name: 'Phil' } } }
        const users = { 1023: { name: 'Michael' } }
        ...
        dispatch({
          type: ActionTypes.UPSERT_ITEMS,
          payload: {
            category: 'users',
            items: allUsers
          },
        })
        // after: { users: { 999: { name: 'Phil' }, 1023: { name: 'Michael' } } }
      ```
  * [UPSERT_ITEM](./core/base/reducers/items/upsertItem.js)
    * inserts or updates an individual item in a category
    * payload: `category`, `key`, `item`
    * if an item already exists with that `key`, it will be merged together with payload.item
    * example:
      ```javascript
        // before: { users: { '1023': { name: 'Michael' }} }
        dispatch({
          type: ActionTypes.UPSERT_ITEM,
          payload: {
            category: 'users',
            key: '1023',
            item: { id: '1023' }
          },
        })
        // after: { users: { '1023': { name: 'Michael', id: '1023' }} }
      ```
  * [SET_ITEMS](./core/base/reducers/items/setItems.js)
    * sets a collection of items by its category name into the store
    * if the category already exists, this will overwrite the existing collection with the new items
    * payload: `category`, `items`
    * example:
      ```javascript
        // before: { }
        const allUsers = await getAllUsers()
        ...
        dispatch({
          type: ActionTypes.SET_ITEMS,
          payload: {
            category: 'users',
            items: allUsers
          },
        })
        // after: { users: [ ... ] }
      ```
  * [SET_ITEM](./core/base/reducers/items/setItem.js)
    * sets an item in a category
    * payload: `category`, `key`, `item`
    * if an item already exists with that `key`, this will overwrite it with the item in the payload
    * example:
      ```javascript
        // before: { users: { '1023': { name: 'Phil' }} }
        dispatch({
          type: ActionTypes.SET_ITEM,
          payload: {
            category: 'users',
            key: '1023',
            item: { name: 'Michael', id: '1023' }
          },
        })
        // after: { users: { '1023': { name: 'Michael', id: '1023 }} }
      ```
  * [REMOVE_ITEM](./core/base/reducers/items/removeItem.js)
    * deletes an item from a category, as identified by its `key`
    * both the value and its key will be removed from the category (as opposed to setting the value to null/undefined)
    * payload: `category`, `key`
    * example
      ```javascript
        // before: { users: { '1023': { ... }} }
        dispatch({
          type: ActionTypes.REMOVE_ITEM,
          payload: {
            category: 'users',
            key: '1023',
          },
        })
        // after: { users: { } }
      ```

##### Initial state
* the initial state of the items reducer is an empty object
* you can change this by creating a file in your tap: `src/reducers/initialStates/tap.js`
  * the exported object will be passed to the items reducer as its initial state
