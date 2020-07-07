/**
 * @typedef {Object} Action - the object that is passed to the dispatch function, then to a reducer
 * @property {string} type - the action type (see ActionTypes enum in __kegActionTypes.js)
 * @property {Object} payload - the payload
 * @property {string} payload.category - the category name of the array or object to update
 * @property { (string | number)? } payload.key - the identifier of an item to insert/remove/update/replace
 * @property {*?} payload.item - the item itself. Omitted on actions like remove
 */
