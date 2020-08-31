class FileNotFoundError extends Error {
  constructor (filename) {
    super(`File not found: ${filename}`)
    this.name = "FileNotFoundError"
  }  
}

module.exports = { FileNotFoundError }