/**
 * @returns { Object } the navigator global without risking reference error. Returns undefined if no navigator is defined
 */
export const getNavigator = () => {
  return (typeof navigator !== 'undefined')
    ? navigator
    : undefined
}