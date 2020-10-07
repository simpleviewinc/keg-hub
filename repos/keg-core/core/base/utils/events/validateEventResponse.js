/**
 * The keg event emitter returns a boolean value when calling `.emit(...)`, indicating
 * whether or not a callback was registered against the event and run.
 *
 * This is a helper to handle that response.
 * @param {boolean} isValid - the response to `.emit`
 * @param {Array<string>} invalidMessages - messages to log if the result was invalid
 * @param {Array<string>} valideMessages - messages to log if the event was valid
 * @return {boolean} - the value of isValid
 */
export const validateEventResponse = (
  isValid,
  invalidMessages,
  validMessages
) => {
  isValid ? console.log(...validMessages) : console.warn(...invalidMessages)
  return isValid
}
