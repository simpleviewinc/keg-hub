import { ActionTypes } from 'SVConstants'
import { items as itemsReducer } from '../reducer'
import { ItemsRequestError } from '../error'
import { Values } from 'SVConstants'

const { IssueTypes } = Values

// test actions
const addUsers = (users, initialState = undefined) =>
  itemsReducer(initialState, {
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: 'users',
      items: users,
    },
    error: null,
  })

const addUser = (user, key, initialState = undefined) =>
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

  const dennis = {
    name: 'Dennis Reynolds',
    company: 'Paddys Pub',
    id: '2',
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
    it('should initialize the items', () => {
      const users = [charlie]
      const nextState = addUsers(users)
      expect(nextState.users).toEqual(expect.arrayContaining([charlie]))
    })
  })

  describe('upsertItem', () => {
    // initialize users before doing anything else
    describe('arrays', () => {
      let nextState = null
      beforeEach(() => {
        nextState = addUsers([])
      })

      it('should append an item to the array when no key index is defined', () => {
        expect(nextState.users.length).toEqual(0)
        expect(Array.isArray(nextState.users)).toBe(true)
        nextState = addUser(charlie, undefined, nextState)
        expect(nextState.users).toEqual(expect.arrayContaining([charlie]))
      })

      it('should update an item at an index', () => {
        expect(nextState.users.length).toEqual(0)
        nextState = addUser(charlie, undefined, nextState)
        expect(nextState.users[0]).toEqual(charlie)
        nextState = addUser(dennis, 0, nextState)
        expect(nextState.users[0]).toEqual(dennis)
      })
    })

    describe('objects', () => {
      let nextState = null
      beforeEach(() => {
        nextState = addUsers({})
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
        nextState = addUser(charlie, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(charlie)
      })

      it('should update an existing item by key', () => {
        nextState = addUser(charlie, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(charlie)
        nextState = addUser(dennis, charlie.id, nextState)
        expect(nextState.users[charlie.id]).toEqual(dennis)
      })
    })
  })

  describe('removeItem', () => {
    let nextState = null

    describe('array', () => {
      beforeEach(() => {
        nextState = addUsers([charlie])
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
        nextState = addUsers({
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
      let state = addUsers([])
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
      let state = addUsers([])
      state = itemsReducer(initialState, {
        type: ActionTypes.UPSERT_ITEM,
        payload: {
          category: 'users',
        },
      })
      expect(state.error).toBeInstanceOf(ItemsRequestError)
      expect(state.error.hasIssue(IssueTypes.InvalidItemAndKey)).toBe(true)
    })
  })
})
