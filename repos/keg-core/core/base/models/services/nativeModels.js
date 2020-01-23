import { deepFreeze } from 'jsutils'
import { Values } from 'SVConstants'
import AppConfig from 'SVAppConfig'

const {
  keg: { native },
} = AppConfig
const { HttpMethods } = Values

export const nativeModels = deepFreeze({
  server: {
    host: native.host,
    port: native.port,
  },
  routes: {
    get: {
      method: HttpMethods.GET,
      url: '/native/tap',
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    post: {
      method: HttpMethods.POST,
      url: '/native/tap',
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  },
})
