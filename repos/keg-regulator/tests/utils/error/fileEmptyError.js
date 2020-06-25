class FileEmptyError extends Error {
  constructor (filename) {
    super(`${filename} was found, but the file was empty.`)
    this.name = "FileEmptyError"
  }  
}

module.exports = { FileEmptyError }