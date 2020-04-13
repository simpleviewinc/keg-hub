

const addValueFiles = (dockerCmd) => {
  return `${dockerCmd} -f docker-compose.yml -f docker-compose-dev.yml`
}

module.exports = {
  addValueFiles
}