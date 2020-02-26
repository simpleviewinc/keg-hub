const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const path = require('path')
const cliIndex = path.join(__dirname, '../../../', 'keg')

const linkToBin = async () => {
  console.log(`---------- Linking Keg CLI to global /bin ----------`)
}


module.exports = {
  linkToBin
}