const componentStates = [ 'default', 'disabled', 'active', 'hover' ]

/**
 * Creates a single theme object using the themeFn and states.
 * @param {Object} themeFn - a function of signature (state) => themeObjectForState
 * @param {*} states - an array of strings, each of which is a state that a component can be in
 * @returns {Object} of form {
 *  default: ... 
 *  disabled: ...,
 *  etc.
 * }
 */
export const buildStateStyles = (themeFn, type, states=componentStates) => {
  const stateThemes = states.reduce(
    (builtTheme, state) => {
      builtTheme[state] = themeFn(state, type)
      return builtTheme 
    },
    {}
  )  

  return stateThemes
}
