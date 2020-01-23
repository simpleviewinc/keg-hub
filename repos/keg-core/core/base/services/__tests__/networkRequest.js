import { Mocks, Axios } from 'SVMocks'
import { Values } from 'SVConstants'

Mocks.setMocks({ axios: Axios })
const { networkRequest } = require('SVServices')
const { HttpMethods } = Values

/**
 * Tests networkRequest on GET & POST calls on zerista API
 */
describe('request: GET', () => {
  it('GET request without querystring', async () => {
    global.testMocks.axios = {
      response: {
        data: [
          {
            id: 2571,
            subdomain: 'zsales',
          },
        ],
        status: 200,
      },
    }

    const networkResponse = await networkRequest(
      'https://zsales.zerista.com/conference'
    )

    // assert
    expect(networkResponse.success).toEqual(true)
    expect(networkResponse.data).toEqual(
      expect.objectContaining(global.testMocks.axios.response.data)
    )
  })

  it('GET request with custom headers', async () => {
    global.testMocks.axios = {
      response: {
        data: {
          first_name: 'Daniel',
          last_name: 'Yo',
        },
        status: 200,
      },
    }

    // user is daniel yo, should always be on that conference
    const networkResponse = await networkRequest(
      'https://zsales.zerista.com/profile/member/2564770'
    )

    // assert
    expect(networkResponse.success).toEqual(true)
    expect(networkResponse.data).toEqual(
      expect.objectContaining(global.testMocks.axios.response.data)
    )
  })
})

describe('request: POST', () => {
  it('POST request with body', async () => {
    const params = {
      user: {
        email: 'sync@zerista.com',
        password: 'syncme!1',
      },
    }
    global.testMocks.axios = {
      response: {
        data: {
          first_name: 'Sync',
          last_name: 'User',
          email: 'sync@zerista.com',
        },
        status: 200,
      },
    }
    const networkResponse = await networkRequest({
      url: 'https://my.zerista.com/login',
      method: HttpMethods.POST,
      params,
    })

    // assert
    expect(networkResponse.success).toEqual(true)
    expect(networkResponse.data).toEqual(
      expect.objectContaining(global.testMocks.axios.response.data)
    )
  })
})

describe('request: DELETE', () => {
  it('DELETE with mock', async () => {
    global.testMocks.axios = {
      response: {
        data: {
          message: 'successfully deleted',
        },
        status: 200,
      },
    }
    const networkResponse = await networkRequest({
      url: 'https://my.zerista.com/user',
      method: HttpMethods.DELETE,
    })

    // assert
    expect(networkResponse.success).toEqual(true)
    expect(networkResponse.data).toEqual(
      expect.objectContaining(global.testMocks.axios.response.data)
    )
  })
})

describe('request: PUT', () => {
  it('PUT with mock', async () => {
    global.testMocks.axios = {
      response: {
        data: {
          message: 'successfully created',
        },
        status: 200,
      },
    }
    const params = {
      user: {
        email: 'sync@zerista.com',
        password: 'syncme!1',
      },
    }
    const networkResponse = await networkRequest({
      url: 'https://my.zerista.com/user/123456',
      method: HttpMethods.PUT,
      params,
    })

    // assert
    expect(networkResponse.success).toEqual(true)
    expect(networkResponse.data).toEqual(
      expect.objectContaining(global.testMocks.axios.response.data)
    )
  })
})

describe('request: PATCH', () => {
  it('PATCH with mock', async () => {
    global.testMocks.axios = {
      response: {
        data: {
          message: 'successfully updated',
        },
        status: 200,
      },
    }
    const params = {
      user: {
        email: 'sync@zerista.com',
        password: 'syncme!1',
      },
    }
    const networkResponse = await networkRequest({
      url: 'https://my.zerista.com/user/123456',
      method: HttpMethods.PATCH,
      params,
    })

    // assert
    expect(networkResponse.success).toEqual(true)
    expect(networkResponse.data).toEqual(
      expect.objectContaining(global.testMocks.axios.response.data)
    )
  })
})

describe('failed Request', () => {
  it('failed GET request', async () => {
    global.testMocks.axios = {
      response: {
        response: {
          data: null,
          status: 404,
        },
        message: 'not found',
      },
    }

    const networkResponse = await networkRequest('not_a_real_url')

    // assert
    expect(networkResponse.success).toEqual(false)
    expect(networkResponse.statusCode).toEqual(404)
    expect(networkResponse.errorMessage).toEqual(
      expect.objectContaining(global.testMocks.axios.response.response.data)
    )
  })
})
