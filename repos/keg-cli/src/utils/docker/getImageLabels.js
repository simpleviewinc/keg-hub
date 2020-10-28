const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')

const getImageLabels = async imageName => {
  const image = await docker.image.get(imageName)
  console.log(`---------- image ----------`)
  console.log(image)
  
}

module.exports = {
  getImageLabels
}