import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Upserts the store with the payload: using "UPSERT_ITEM" if `payload.item` is defined,
 * and "UPSERT_ITEMS" if `payload.items` is defined. If any item(s) already exist,
 * they will be merged in with this payload's item(s)
 * @param {object} params
 * @param {string} params.category - category to insert into
 * @param {string?} params.key - key identifier of item
 * @param {*?} params.item - value to upsert
 * @param {(object | Array<*>)?} params.items - values to upsert
 * @param {object?} params.meta - metadata to attach to action
 */
export const upsert = ({ meta = {}, ...payload }) => {
  dispatch({
    type: payload.key ? ActionTypes.UPSERT_ITEM : ActionTypes.UPSERT_ITEMS,
    payload,
    ...meta,
  })
}
