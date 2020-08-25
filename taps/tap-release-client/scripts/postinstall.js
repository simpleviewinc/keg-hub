const { autoLink } = require('./autoLink')


;(async () => {

  try {
    await autoLink()
  }
  catch(err){
    console.error(err.stack)
    process.exit(1)
  }

})()
