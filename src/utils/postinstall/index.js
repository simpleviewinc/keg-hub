const { makeExecutable } = require('./makeExecutable')
const { linkToBin } = require('./linkToBin')


;(async () => {

  // Makes <root_dir>/keg executable
  await makeExecutable()

  // Links <root_dir>/keg to the machines /bin directory
  await linkToBin()

})()