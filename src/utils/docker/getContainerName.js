const { isArr } = require('jsutils')

const getContainerName = (def, options) => {
  return isArr(options) &&
    options.reduce((name, option, index) => {
      return name
        ? name
        : option === "name" ||
          option === "-name" ||
          option === "n" ||
          option === "-n"
            ? options[index + 1]
            : option.indexOf('name=') || option.indexOf('n=')
              ? option.split('=')[1]
              : name

    }, false) || def
}

module.exports = {
  getContainerName
}