const crypto = require('crypto')

const algorithm = 'aes-128-cbc'
const secretFormat = 'hex'
const iv = crypto.randomBytes(16)
const salt = 'a4E36cDq'

const getKey = (password) => {
  const hash = crypto.createHash("sha1")
  hash.update(password)
  return hash.digest().slice(0, 16)
}

/**
 * Encrypts the passed in string
 * @param {string} str - String to be encrypted
 *
 * @returns {string} - Encrypted string
 */
const encrypt = (str, password) => {
  const key = getKey(password || salt)
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(str)
  const encryptedBuffer = Buffer.concat([encrypted, cipher.final()])

  return iv.toString(secretFormat) + ':' + encryptedBuffer.toString(secretFormat)
}

/**
 * Decrypts the passed in string
 * @param {string} data - String to be decrypted
 *
 * @returns {string} - Decrypted string
 */
const decrypt = (str, password) => {

  const strSplit = str.split(':')
  const ivFromKey = Buffer.from(strSplit.shift(), secretFormat);
  const encryptedText = Buffer.from(strSplit.join(':'), secretFormat)

  const key = getKey(password || salt)
  const decipher = crypto.createDecipheriv(algorithm, key, ivFromKey)
  const decrypted = decipher.update(encryptedText)

  return Buffer.concat([decrypted, decipher.final()]).toString()

}

module.exports = {
  encrypt,
  decrypt
}
