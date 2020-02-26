
const testCommand = () => {
  console.log(`--- Test a cli command ---`)
}

module.exports = {
  name: 'test',
  action: testCommand,
  description: `Test a cli command`,
  example: 'keg global test'
}