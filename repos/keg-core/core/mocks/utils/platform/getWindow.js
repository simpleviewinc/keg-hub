export const getWindowMock = () => global.mockWindow

export const validWindowMock = {
  matchMedia: val => ({ matches: true }),
}
