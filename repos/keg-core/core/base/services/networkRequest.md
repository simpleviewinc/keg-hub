# Network Service
* Wrapper to use when making http request
* Utilizes [Axios](https://www.npmjs.com/package/react-native-axios)

## Response Model
* Model to be expected when calling `'networkRequest'` method
```Javascript
networkResponse = {
  success: false,
  statusCode: null,
  data: null,
  errorMessage: null
}
```

## Usage
* Imports
  ```Javascript
  import { networkRequest } from 'SVServices/network'
  import { Values } from 'SVConstants'
  ```
* Desconstruct the 'HTTPMethod'
  ```Javascript
  const { HttpMethod } = Values
  ```
* Example:
  ```Javascript
  const body = {
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
  }
  // no need to try-catch because networkRequest will always return the response object regardless
  const networkResponse = await networkRequest(HttpMethod.POST, 'https://reqres.in/api/login', body)
  console.log('Network Response:')
  console.log(networkResponse)
  if (networkResponse.success) {
    console.log('Successful Call')
  } else {
    console.log('Unsuccessful Call')
  }

  ```
 