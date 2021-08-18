import { isValidUrl } from 'KegUtils/helpers/string'

export const Axios = jest.fn(request => {
  return new Promise((resolve, reject) => {
    if (isValidUrl(request.url)) {
      resolve(global.testMocks.axios.response)
    }
    else {
      reject(global.testMocks.axios.response)
    }
  })
})
