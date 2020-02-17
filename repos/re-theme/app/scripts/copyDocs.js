const { copy, remove } = require('./copyRemove')
const path = require('path')

;(() => {

  try {

    // Path to parent re-theme docs
    const docs = path.join(__dirname, '../../docs')

    // Path to the app build
    const build = path.join(__dirname, '../build')

    // Remove the old build in the apps node_modules
    remove(docs)

    // Copy over the new build from the parent folder
    copy(build, docs)

  }
  catch(err){
    console.error(err.stack)
    process.exit(1)
  }

})()