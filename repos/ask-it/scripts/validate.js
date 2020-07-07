const { ask, models } = require('../src')

;( async () => {

  const askResponse = await ask(models.number)
  console.log(`---------- askResponse ----------`)
  console.log(askResponse)

  const confirmResponse = await ask.confirm(models.confirm)
  console.log(`---------- confirmResponse ----------`)
  console.log(confirmResponse)

  const inputResponse = await ask.input(models.input)
  console.log(`---------- inputResponse ----------`)
  console.log(inputResponse)

  const passwordResponse = await ask.password(models.password)
  console.log(`---------- passwordResponse ----------`)
  console.log(passwordResponse)
  
  const listResponse = await ask.promptList([
    'Option 1',
    'Option 2',
    'Option 3',
  ])
  console.log(`---------- listResponse ----------`)
  console.log(listResponse)

})()