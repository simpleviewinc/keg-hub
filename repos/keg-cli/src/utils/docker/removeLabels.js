const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get, isObj } = require('@keg-hub/jsutils')

/**
 * Parse the imageRef labels looking for for matches to labelRef
 * <br/>Then clear out the docker-compose label values, used for docker-compose labels
 * @param {string} imageRef - Docker reference to the image
 * @param {string} labelRef - Reference to the labels to be cleared out
 * @param {Array} opts - Prebuilt argument options passed to the docker run command
 * @param {boolean} logErr - True if we should log label error as warning
 *
 * @returns {Array} - opts array, with label keys added without the value
*/
const removeLabels = async (imageRef, labelRef, opts=[], logErr) => {

  // Wrap it a try catch, cause we may not care if the labels can not be nulled out
  try {
    const imgInspect = isObj(imageRef) && isObj(imageRef.Config)
      ? imageRef
      : await docker.image.inspect({ image: imageRef })

    const imgLabels = get(imgInspect, 'Config.Labels', {})

    Object.entries(imgLabels)
      .map(([ key, value ]) => key.includes(labelRef) && opts.push(`--label ${key}`) )
  }
  catch(err){
    logErr && Logger.warn(err.stack)
  }

  return opts
}

module.exports = {
  removeLabels
}