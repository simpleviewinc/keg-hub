const fs = require('fs')
const path = require('path')
const envPath = path.join(__dirname, '../jsconfig.json')
const aliases = require('../configs/aliases.json')
const params = process.argv

/**
 * Create the jsconfig obj
 * 
 * @param {string} platform - string to replace the template string with
 */
const createObj = (platform='web') => {

  let paths = {}
  const baseUrl = '.'

  // map the aliases from config
  Object.entries(aliases).map(([key, val]) => {
    paths[key] = [val.replace("${platform}", platform)]
  })

  return {
    compilerOptions: {
      target: 'es6',
      baseUrl,
      paths
    },
    exclude: ['node_modules']
  }
}


console.log('Syncing jsconfig file')
fs.writeFileSync(envPath, JSON.stringify(createObj(params[2]), null, 2) , 'utf-8')