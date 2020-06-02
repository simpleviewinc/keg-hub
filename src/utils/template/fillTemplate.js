const { get, mapObj } = require('jsutils')
const { template } = require('jsutils')
const rootDir = require('app-root-path').path
const { getRootDir } = require('../getters')
const { readFile } = require('KegFileSys')
const path = require('path')

template.regex = /{{([^}]*)}}/g

const getTemplate = async (filePath, fromRoot=false) => {
  const location = fromRoot
    ? path.join(getRootDir(), filePath)
    : filePath

  return readFile(location)
}

const fillFromPath = async (loc, data, root) => {
  const content = await getTemplate(loc, root)

  return template(content, data)
}

const fillTemplate = ({ template:tmp, loc, data={}, root }) => {
  return !tmp && loc
    ? fillFromPath(loc, data, root)
    : tmp && template(tmp, data)
}

module.exports = {
  fillTemplate
}