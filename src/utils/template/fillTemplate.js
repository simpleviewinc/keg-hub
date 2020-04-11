const { get, mapObj } = require('jsutils')
const { template } = require('jsutils/build/cjs/string')
const rootDir = require('app-root-path').path
const { getRootDir } = require('../getters')
const { readFile } = require('KegFileSys')
const path = require('path')

const getTemplate = async (filePath, fromRoot=false) => {
  const location = fromRoot
    ? path.join(getRootDir(), filePath)
    : filePath

  return readFile(location)
}

const fillTemplate = async ({ loc, data={}, root }) => {
  const content = await getTemplate(loc, root)

  return template(content, data)
}

module.exports = {
  fillTemplate
}