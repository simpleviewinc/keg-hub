import { tapState } from 'KegReducers/initialStates/__kegTap'

const initialState = { ...tapState }
export const tap = (state = initialState, action) => initialState
