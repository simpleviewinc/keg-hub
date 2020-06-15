/**
 * @returns { Object } the window global without risking reference error. Returns undefined if no window global
 */
export const getWindow = () => {
  return typeof window !== 'undefined' ? window : undefined
}
