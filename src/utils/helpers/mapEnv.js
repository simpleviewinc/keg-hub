
/**
 * Maps the env arg value shortcut to it's actual value
 * @function
 * @param {string} value - Value to map shortcut to full name
 *
 * @returns {string} - Full env value if found or the original value
 */
const mapEnv = value => {
  if(!value || value === 'dev' || value === 'd') return 'development'
  if(value === 'qa' || value === 'q') return 'qa'
  if(value === 'st' || value === 's') return 'staging'
  if(value === 'prod' || value === 'p') return 'production'

  return value
}


module.exports = {
  mapEnv
}