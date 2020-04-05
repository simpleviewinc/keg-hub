

const setup = () => {
  console.log(`--- setup a cli command ---`)
}

module.exports = {
  name: 'setup',
  action: setup,
  description: `Sets up the keg-cli command`,
  example: 'keg global setup <options>'
}