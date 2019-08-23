const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const package = require('./package.json')

const fixDocs = async () => {
  try {
    await cmdExec(`mv ./docs/${package.name}/${package.version}/* ./docs/`)
    await cmdExec(`rm -rf ./docs/jsutils`)
    console.log(`---------- Success ----------`)
    process.exit(0)
  }
  catch(e){
    console.error(e)
    process.exit(1)
  }
}

fixDocs()