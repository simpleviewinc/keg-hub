const { copy, remove } = require('./copyRemove')
const path = require('path')

;(() => {

  try {

    // Path to parent re-theme docs
    const rootReadme = path.join(__dirname, '../../README.md')

    // Path to the app build
    const srcReadme = path.join(__dirname, '../src/Readme.md')

    // Remove the old readme in the apps node_modules
    remove(srcReadme)

    // Copy over the new readme from the parent folder
    copy(rootReadme, srcReadme)

  }
  catch(err){
    console.error(err.stack)
    process.exit(1)
  }

})()