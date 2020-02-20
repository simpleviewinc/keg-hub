export const getWindowMock = () => global.mockWindow

export const validWindowMock = {
  matchMedia: (q) => ({ matches: true }),
}