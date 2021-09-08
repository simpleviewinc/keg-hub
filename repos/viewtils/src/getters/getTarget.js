export const getTarget = (isWeb, target) => {
  return isWeb && target ? { target } : {}
}
