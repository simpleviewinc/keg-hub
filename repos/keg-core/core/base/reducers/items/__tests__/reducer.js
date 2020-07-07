import { ActionTypes } from 'SVConstants'
import { items as itemsReducer } from '../reducer'
import { ItemsRequestError } from '../error'
import { Values } from 'SVConstants'

const { IssueTypes } = Values

// test actions
const upsertUsers = (users, initialState = undefined) =>
  itemsReducer(initialState, {
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: 'users',
      items: users,
    },
    error: null,
  })

const upsertUser = (user, key, initialState = undefined) =>
  itemsReducer(initialState, {
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: 'users',
      item: user,
      key,
    },
    error: null,
  })

const removeUser = (key, initialState = undefined) =>
  itemsReducer(initialState, {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      category: 'users',
      key,
    },
    error: null,
  })

describe('items reducer', () => {
  const charlie = {
    name: 'Charlie Kelly',
    company: 'Paddys Pub',
    id: '1',
  }

  const charlieUpdate = {
    name: 'Charles',
    alias: 'Day Man',
  }

  const matt = {
    name: 'Matt',
    company: { name: 'simpleviewinc', location: 'tucson' },
  }

  const mattUpdate = {
    company: {
      name: 'Simpleview',
    },
  }

  const dennis = {
    name: 'Dennis Reynolds',
    company: 'Paddys Pub',
    id: '2',
  }

  const frank = {
    name: 'Frank Reynolds',
    alias: 'The Warthog',
    id: '11',
  }

  describe('Invalid action type', () => {
    const initialState = { test: 1 }
    const invalidActionType = Symbol()
    it('should return the initialState unchanged', () => {
      const nextState = itemsReducer(initialState, {
        type: invalidActionType,
        payload: {},
      })
      expect(nextState).toEqual(initialState)
    })
  })

  describe('upsertItems', () => {
    describe('objects', () => {
      const users = { [charlie.id]: charlie }
      it('should initialize the items', () => {
        const nextState = upsertUsers(users)
        expect(nextState.users).toEqual(
          expect.objectContaining({ [charlie.id]: charlie })
        )
      })

      it('should merge items if the category already exists', () => {
        let nextState = upsertUsers(users)
        expect(nextState.users).toEqual(
          expect.objectContaining({ [charlie.id]: charlie })
        )
        nextState = upsertUsers({ [frank.id]: frank }, nextState)
        expect(nextState.users).toEqual(
          expect.objectContaining({
            [charlie.id]: charlie,
            [frank.id]: frank,
          })
        )
      })
    })

    describe('arrays', () => {
      it('should initialize the items', () => {
        const users = [charlie]
        const nextState = upsertUsers(users)
        expect(nextState.users).toEqual(expect.arrayContaining([charlie]))
      })

      it('should merge items if the category already exists', () => {
        const users = [charlie]
        let nextState = upsertUsers(users)
        expect(nextState.users).toEqual(expect.arrayContaining([charlie]))
        nextState = upsertUsers([frank], nextState)
        expect(nextState.users).toEqual(
          expect.arrayContaining([ charlie, frank ])
        )
      })
    })
  })

  describe('upsertItem', () => {
    // initialize users before doing anything else
    describe('arrays', () => {
      let nextState = null
      beforeEach(() => {
        nextState = upsertUsers([])
      })

      it('should append an item to the array when no key index is defined', () => {
        expect(nextState.users.length).toEqual(0)
        expect(Array.isArray(nextState.users)).toBe(true)
        nextState = upsertUser(charlie, undefined, nextState)
        expect(nextState.users).toEqual(expect.arrayContaining([charlie]))
      })

      it('should update an item at an index', () => {
        expect(nextState.users.length).toEqual(0)
        nextState = upsertUser(charlie, undefined, nextState)
        expect(nextState.users[0]).toEqual(charlie)
        nextState = upsertUser(dennis, 0, nextState)
        expect(nextState.users[0]).toEqual(dennis)
      })

      it('should merge an item at an index', () => {
        nextState = upsertUser(charlie, undefined, nextState)
        expect(nextState.users[0]).toEqual(charlie)
        nextState = upsertUser(charlieUpdate, 0, nextState)
        // verify it has properties from both the existing item and the updated properties
        expect(nextState.users[0].name).toEqual(charlieUpdate.name)
        expect(nextState.users[0].alias).toEqual(charlieUpdate.alias)
        expect(nextState.users[0].company).toEqual(charlie.company)
      })

      it('should deeply merge an item at an index', () => {
        nextState = upsertUser(matt, undefined, nextState)
        expect(nextState.users[0]).toEqual(matt)

        nextState = upsertUser(mattUpdate, 0, nextState)

        // verify it has properties from both the existing item and the updated properties
        expect(nextState.users[0].name).toEqual(matt.name)
        expect(nextState.users[0].company.name).toEqual(mattUpdate.company.name)
        expect(nextState.users[0].company.location).toEqual(
          matt.company.location
        )
      })
    })

    describe('objects', () => {
      let nextState = null
      beforeEach(() => {
        nextState = upsertUsers({})
      })

      it('should append an item to the category level if key is not provided', () => {
        expect(nextState.users).toEqual({})
        nextState = itemsReducer(nextState, {
          type: ActionTypes.UPSERT_ITEM,
          payload: {
            category: 'users',
            item: charlie,
          },
          error: null,
        })
        expect(nextState.users).toEqual(charlie)
      })

      it('should add an item', () => {
        expect(nextState.users[charlie.id]).toBe(undefined)
        nextState = upsertUser(charlie, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(charlie)
      })

      it('should update an existing item by key', () => {
        nextState = upsertUser(charlie, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(charlie)
        nextState = upsertUser(dennis, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(dennis)
      })

      it('should merge an item by key', () => {
        nextState = upsertUser(charlie, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(charlie)
        nextState = upsertUser(charlieUpdate, charlie.id, nextState)

        // verify it has properties from both the existing item and the updated properties
        expect(nextState.users[charlie.id].name).toEqual(charlieUpdate.name)
        expect(nextState.users[charlie.id].alias).toEqual(charlieUpdate.alias)
        expect(nextState.users[charlie.id].company).toEqual(charlie.company)
      })

      it('should deeply merge an item by key', () => {
        nextState = upsertUser(charlie, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(charlie)
        nextState = upsertUser(charlieUpdate, charlie.id, nextState)

        // verify it has properties from both the existing item and the updated properties
        expect(nextState.users[charlie.id].name).toEqual(charlieUpdate.name)
        expect(nextState.users[charlie.id].alias).toEqual(charlieUpdate.alias)
        expect(nextState.users[charlie.id].company).toEqual(charlie.company)
      })

      it('should deeply merge an item that has a property with an array value', () => {
        const id = Symbol()
        const user = {
          facts: {
            favoriteNumbers: [ 1, 2, 3 ],
          },
        }

        const userUpdate = {
          facts: {
            favoriteNumbers: [ 0, 5, 9 ],
          },
        }

        nextState = upsertUser(user, id, nextState)
        nextState = upsertUser(userUpdate, id, nextState)
        expect(nextState.users[id].facts.favoriteNumbers).toEqual(
          expect.arrayContaining([ 0, 1, 2, 3, 5, 9 ])
        )
      })

      it('should merge an item that is an array', () => {
        const id = Symbol()
        nextState = upsertUser([ 1, 2, 3 ], id, nextState)
        nextState = upsertUser([ 4, 5 ], id, nextState)
        expect(nextState.users[id]).toEqual(
          expect.arrayContaining([ 1, 2, 3, 4, 5 ])
        )
      })
    })
  })

  describe('removeItem', () => {
    let nextState = null

    describe('array', () => {
      beforeEach(() => {
        nextState = upsertUsers([charlie])
      })

      it('should remove a user by index', () => {
        expect(nextState.users.length).toEqual(1)
        const stateAfterRemove = removeUser(0, nextState)
        expect(stateAfterRemove.users.length).toEqual(0)
        expect(nextState.error).toBeFalsy()
        expect(nextState.users.error).toBeFalsy()
      })
    })

    describe('object', () => {
      beforeEach(() => {
        nextState = upsertUsers({
          [charlie.id]: charlie,
        })
      })

      it('should remove a user by key', () => {
        expect(nextState.users[charlie.id]).toEqual(charlie)
        const stateAfterRemove = removeUser(charlie.id, nextState)
        expect(stateAfterRemove.users[charlie.id]).toBeUndefined()
        expect(nextState.error).toBeFalsy()
        expect(nextState.users.error).toBeFalsy()
      })
    })
  })

  describe('error handling', () => {
    const initialState = undefined

    it('should set errors for no category defined', () => {
      const state = itemsReducer(initialState, {
        type: ActionTypes.UPSERT_ITEMS,
        payload: {
          items: [charlie],
        },
      })
      expect(state.error).toBeInstanceOf(ItemsRequestError)
      expect(state.error.hasIssue(IssueTypes.InvalidCategory)).toBe(true)
    })

    it("should set errors for data types that aren't objects or arrays", () => {
      const state = itemsReducer(initialState, {
        type: ActionTypes.UPSERT_ITEMS,
        payload: {
          category: 'users',
          items: 1,
        },
      })
      expect(state.error).toBeInstanceOf(ItemsRequestError)
      expect(state.error.hasIssue(IssueTypes.InvalidItemsType)).toBe(true)
    })

    it('should set errors for attempting to add items to nonexistent categories', () => {
      let state = upsertUsers([])
      state = itemsReducer(initialState, {
        type: ActionTypes.UPSERT_ITEM,
        payload: {
          category: 'cars',
          item: 'ferrari',
          key: 'id',
        },
      })
      expect(state.error).toBeInstanceOf(ItemsRequestError)
      expect(state.error.hasIssue(IssueTypes.MissingCategory)).toBe(true)
    })

    it('should set errors for upsert item without key or item', () => {
      let state = upsertUsers([])
      state = itemsReducer(initialState, {
        type: ActionTypes.UPSERT_ITEM,
        payload: {
          category: 'users',
        },
      })
      expect(state.error).toBeInstanceOf(ItemsRequestError)
      expect(state.error.hasIssue(IssueTypes.InvalidItemAndKey)).toBe(true)
    })

    it('should set errors for mismatched item types on upsertItems update', () => {
      let state = upsertUsers([])
      state = upsertUsers({}, state)
      expect(
        state.error && state.error.hasIssue(IssueTypes.MismatchedItemTypes)
      ).toBe(true)
    })

    it('should set errors for mismatched item types on upsertItem update', () => {
      let state = upsertUsers({})
      state = upsertUser(charlie, charlie.id, state)
      state = upsertUser('Charlie', charlie.id, state)
      expect(
        state.users.error &&
          state.users.error.hasIssue(IssueTypes.MismatchedItemTypes)
      ).toBe(true)
    })
  })
})
