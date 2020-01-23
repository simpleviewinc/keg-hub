// TODO: Move to separate file
const SVReload =
  typeof window === 'undefined'
    ? { reload: null }
    : { reload: () => window.location.reload() }

export { SVReload }
