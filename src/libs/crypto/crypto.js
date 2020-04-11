const crypto = require('crypto')

const randP = 'd6F3Efeq'
const algorithm = 'aes-256-cbc'
const strFormat = 'utf8'
const secretFormat = 'hex'

/**
 * Encrypts the passed in string
 * @param {string} str - String to be encrypted
 *
 * @returns {string} - Encrypted string
 */
const encrypt = str => {
  const cipher = crypto.createCipher(algorithm, randP)
  let data = cipher.update(str, strFormat, secretFormat)
  data += cipher.final(secretFormat)

  return data
}

/**
 * Decrypts the passed in string
 * @param {string} data - String to be decrypted
 *
 * @returns {string} - Decrypted string
 */
const decrypt = data => {
  const decipher = crypto.createDecipher(algorithm, randP)
  let str = decipher.update(data, secretFormat, strFormat)
  str += decipher.final(strFormat)

  return str;
}

module.exports = {
  encrypt,
  decrypt
}
