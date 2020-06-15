import { isFunc } from 'jsutils'

const errorHandler = (module, key, method) => {
  return async (...args) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await method(...args)
        return res(response)
      }
      catch (e) {
        // TODO: add better error handling here
        // Send notification to zerista
        rej(e.message)
      }
    })
  }
}

export const catchInjector = module => {
  Object.entries(module).map(([ key, value ]) => {
    if (!isFunc(value)) return

    module[key] = errorHandler(module, key, value)
  })
}
