/** @module url */

'use strict'

// import { reduceObj, isObj } from './object'

// export const getUrlParamObj = url => {
//   const currentParams = {}
//   const params = urlGetQuery(url)
//   if(!params) return currentParams
  
//   const split = params.split('&')
//   split.length &&
//     split.map(item => {
//       const itemSplit = item.split('=')
//       if (itemSplit.length === 2) {
//         currentParams[decodeURIComponent(itemSplit[0])] = decodeURIComponent(itemSplit[1])
//       }
//     })

//   return currentParams
// }

// export const objToUrlParams = obj => {
//   let firstSet
//   return reduceObj(obj, (key, value, urlStr) => {
//     if(!value) return urlStr

//     const useVal = isStr(value) ? value : isObj(value) ? JSON.stringify(value) : null
//     if(!useVal) return urlStr

//     urlStr = !firstSet
//       ? `${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
//       : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
//     firstSet = true

//     return urlStr
//   }, '')
// }

// export const getUrlObj = url => {
//   const urlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
//   const result = urlRegEx.exec(url || window.location.href)

//   const attrs = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash']
//   const urlData = attrs.reduce((data, attr) => {
//     if(typeof result[attr] === "undefined") result[attr] = ""  
//     if(result[attr] !== "" && (attrs[attr] === "port" || attrs[attr] === "slash"))
//         result[attr] = `:${result[attr]}`
    
//     data[attr] = result[attr]
//     return data
//   }, {})

//   urlData['path'] = "/" + urlData['path']

//   return urlData
// }

// export const urlUpcertParam = (url, key, value) => {
//   url = url || ''
//   const re = new RegExp('(\\?|&)'+ key +'=[^&]*' )
//   const param = `${key}=${encodeURIComponent(value)}`

//   return re.test(url)
//     ? url.replace(re, `${$1}${param}`)
//     : addParam(url, null, null, param)
// }

// export const urlAddParam = (url, key, value, param) => {
//   url = url || ''
//   param = param || `${key}=${encodeURIComponent(value)}`
//   url.indexOf('?') === -1 && (url += '?')
//   url.indexOf('=') !== -1 && (url += '&')

//   return `${url}${param}`
// }

// export const urlHasParam(url, paramName) {
//   const regex = new RegExp('(\\?|&)'+ paramName +'=', 'g')
//   return regex.test(urlGetQuery(url))
// }

// export const urlGetQuery = url => {
//   const queryString = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(url)
//   return queryString ? decodeURIComponent(queryString[0].replace(/\+/g,' ')) : ''
// }